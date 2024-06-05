import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import SelectOption from 'components/SelectOption/SelectOption';
import SingleSelectOption from 'components/SelectOption/SingleSelectOption';
import Filter from 'components/Filter/Filter';
import { format } from 'date-fns';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
import HighchartsReact from 'highcharts-react-official';
import { useBrandQuery } from 'hooks/useBrandQuery';
import { useAveragePriceQuery } from 'hooks/useAveragePriceQuery';
import useItemParams from 'hooks/useItemParams';
import useLabelNameParams from 'hooks/useLabelNameParams';
import useSplitNameParams from 'hooks/useSplitNameParams';
import useStatsNameParams from 'hooks/useStatsNameParam';
import { DateRangeProps } from 'react-date-range';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  SettingType,
  brandsState,
  genderState,
  periodState,
  SKUState,
  newItemState,
  drillDownState,
} from 'store/setting';
import { splitState } from 'store/split';
Drilldown(Highcharts);

const AveragePricePage = () => {
  const item = useItemParams();
  const splitName = useSplitNameParams();
  const labelName = useLabelNameParams();

  const stats_name = useStatsNameParams();
  // const initialDrilldownName = "small_category"; // 초기 드릴다운 이름 설정
  const brandList = useBrandQuery();

  const localBrand = useRecoilValue(brandsState);
  const localPeriod = useRecoilValue(periodState);
  const localGenders = useRecoilValue(genderState);
  const splits = useRecoilValue(splitState);
  const localSKU = useRecoilValue(SKUState);
  const localNewItems = useRecoilValue(newItemState);
  const localDrilldownName = useRecoilValue(drillDownState) ?? "small_category";

  const [brands, setBrands] = useState<string[]>(localBrand);
  const [period, setPeriod] = useState<SettingType['period']>(localPeriod);
  const [genders, setGenders] = useState<string[]>(localGenders);
  const [items, setItems] = useState<string[]>(splitName ? [] : [item]);
  const [SKU, setSKU] = useState<boolean>(localSKU);
  const [newitems, setNewItems] = useState<boolean>(localNewItems);
  const [drilldownName, setDrilldownName] = useState<string>(localDrilldownName); // 드릴다운 이름 상태 추가

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

  const stats = useAveragePriceQuery({
    keywords: keywords.includeKeywords.concat(items),
    ex_keywords: keywords.excludeKeywords,
    stats_name,
    drilldown_name: drilldownName, // 선택된 드릴다운 이름 사용
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

  const handleChangeDrilldown = useCallback(
    (drilldown: string) => {
      setDrilldownName(drilldown as string);
    },
    [setDrilldownName]
  );

  const renderChart = useCallback(() => {
    return stats.map((options, index) => (
      <HighchartsReact key={index} highcharts={Highcharts} options={options} />
    ));
  }, [stats]);

  return (
    <Stack direction={'column'} spacing={2}>
      <SelectOption
        options={selectableBrands}
        setState={setBrands}
        placeholder="Select Brands"
        value={brands}
        title="Select Brands"
      />
      <SingleSelectOption
        options={[
          'small_category',
          'fiber',
          'fabric',
          'woven',
          'knitted',
          'detail',
          'print',
          'color',
          'shape',
          'length',
          'sleeve_length',
          'neckline',
          'collar',
          'quilting',
          'quiltpt'
        ]}
        setState={handleChangeDrilldown}
        placeholder="Select Drilldown"
        value={drilldownName}
        title="Select Drilldown"
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

export default AveragePricePage ;
