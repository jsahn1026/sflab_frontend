import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SelectOption from 'components/SelectOption/SelectOption';
import Filter from 'components/Filter/Filter';
import { format } from 'date-fns';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import { useBrandQuery } from 'hooks/useBrandQuery';
import { useFabricQuery } from 'hooks/useFabricQuery';
import useItemParams from 'hooks/useItemParams';
import useLabelNameParams from 'hooks/useLabelNameParams';
import useSplitNameParams from 'hooks/useSplitNameParams';
import { DateRangeProps } from 'react-date-range';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  SettingType,
  brandsState,
  genderState,
  periodState,
  SKUState,
  newItemState,
  itemState,
} from 'store/setting';
import { splitState } from 'store/split';
Drilldown(Highcharts);
exporting(Highcharts);
exportData(Highcharts);
const FabricPage = () => {
  const item = useItemParams();
  const splitName = useSplitNameParams();
  const labelName = useLabelNameParams();

  const brandList = useBrandQuery();

  const localBrand = useRecoilValue(brandsState);
  const localPeriod = useRecoilValue(periodState);
  const localGenders = useRecoilValue(genderState);
  const splits = useRecoilValue(splitState);
  const localSKU = useRecoilValue(SKUState);
  const localNewItems = useRecoilValue(newItemState);

  const [brands, setBrands] = useState<string[]>(localBrand);
  const [period, setPeriod] = useState<SettingType['period']>(localPeriod);
  const [genders, setGenders] = useState<string[]>(localGenders);
  const [items, setItems] = useState<string[]>(splitName ? [] : [item]);
  const [SKU, setSKU] = useRecoilState(SKUState);
  const [newitems, setNewItems] = useRecoilState(newItemState);

  const selectableBrands = useMemo(
    () => brandList.filter((brand) => !brands.includes(brand)),
    [brandList, brands]
  );

  const keywords = useMemo(() => {
    if (labelName) {
      const label = splits
        .find((split) => split.splitName == splitName)
        ?.label.find((label) => label.labelName == labelName);

      if (label) {
        const { includeKeywords, excludeKeywords } = label;
        return { includeKeywords, excludeKeywords };
      }
    }

    if (splitName) {
      const includeKeywords = splits
        .map((split) =>
          split.label.map(({ includeKeywords }) => includeKeywords)
        )
        .flat()
        .flat();

      const excludeKeywords = splits
        .map((split) =>
          split.label.map(({ excludeKeywords }) => excludeKeywords)
        )
        .flat()
        .flat();

      return {
        includeKeywords,
        excludeKeywords,
      };
    }

    return {
      includeKeywords: [],
      excludeKeywords: [],
    };
  }, [splits, splitName, labelName, items]);

  useEffect(() => {
    setItems(splitName ? [] : [item]);
    setBrands(localBrand);
    setGenders(localGenders);
    setPeriod(localPeriod);
  }, [item]);

  const fabric = useFabricQuery({
    keywords: keywords.includeKeywords.concat(items),
    ex_keywords: keywords.excludeKeywords,
    brands,
    period,
    genders,
    SKU,
    newitems,
  });

  const handleChangeBrands = useCallback(
    (brands: string[]) => {
      setBrands(brands);
    },
    [setBrands]
  );

  const handleOnRangeChange = useCallback(
    (ranges: DateRangeProps) => {
      setPeriod({
        startDate: format(ranges['selection'].startDate, 'yyyy-MM-dd'),
        endDate: format(ranges['selection'].endDate, 'yyyy-MM-dd'),
      });
    },
    [setPeriod]
  );

  const handleChangeGender = useCallback(
    (genders: string[]) => {
      setGenders(genders);
    },
    [setGenders]
  );

  const handleChangeItems = useCallback(
    (items: string[]) => {
      setItems(items);
    },
    [setItems]
  );

  const renderChart = useCallback(() => {
    return fabric.map((options, index) => (
      <HighchartsReact key={index} highcharts={Highcharts} options={options} />
    ));
  }, [fabric]);

  return (
    <Stack direction={'column'} spacing={2}>
      <SelectOption
        options={selectableBrands}
        setState={setBrands}
        placeholder="Select Brands"
        value={brands}
        title="Select Brands"
      />
      <Filter
        period={period}
        handleOnRangeChange={handleOnRangeChange}
        genders={genders}
        handleChangeGender={handleChangeGender}
        items={items}
        handleChangeItems={handleChangeItems}
      />
      <Stack direction={'row'} spacing={2}>
        <FormControlLabel
          control={<Checkbox checked={SKU} onChange={() => setSKU(!SKU)} />}
          label="SKU"
        />
        <FormControlLabel
          control={<Checkbox checked={newitems} onChange={() => setNewItems(!newitems)} />}
          label="New Items"
        />
      </Stack>
      <Stack flex={1} spacing={2}>
        {renderChart()}
      </Stack>
    </Stack>
  );
};

export default FabricPage