// import Switch from 'react-switch';
import Stack from '@mui/material/Stack';

import Filter from 'components/Filter/Filter';
import SelectOption from 'components/SelectOption/SelectOption';
import { format } from 'date-fns';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useBrandQuery } from 'hooks/useBrandQuery';
import useItemParams from 'hooks/useItemParams';
import useLabelNameParams from 'hooks/useLabelNameParams';
import { usePricesQuery } from 'hooks/usePricesQuery';
import useSplitNameParams from 'hooks/useSplitNameParams';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRangeProps } from 'react-date-range';
import { useRecoilValue } from 'recoil';
import {
  SettingType,
  brandsState,
  genderState,
  periodState,
} from 'store/setting';
import { splitState } from 'store/split';

require('highcharts/highcharts-more.js')(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
  },
});

const PricePage = () => {
  const item = useItemParams();
  const splitName = useSplitNameParams();
  const labelName = useLabelNameParams();

  const brandList = useBrandQuery();

  const localBrand = useRecoilValue(brandsState);
  const localPeriod = useRecoilValue(periodState);
  const localGenders = useRecoilValue(genderState);
  const splits = useRecoilValue(splitState);

  const [brands, setBrands] = useState<string[]>(localBrand);
  const [period, setPeriod] = useState<SettingType['period']>(localPeriod);
  const [genders, setGenders] = useState<string[]>(localGenders);
  const [items, setItems] = useState<string[]>(splitName ? [] : [item]);

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

  const prices = usePricesQuery({
    keywords: keywords.includeKeywords.concat(items),
    ex_keywords: keywords.excludeKeywords,
    brands,
    period,
    genders,
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
    return prices.map((options) => (
      <HighchartsReact highcharts={Highcharts} options={options} />
    ));
  }, [prices]);

  return (
    <Stack direction={'column'} spacing={5}>
      {/* <Typography fontSize={15} fontWeight={'bold'}>
          Select Brands
        </Typography> */}
      {/* <TransferList
          left={selectableBrands}
          right={brands}
          handleChangeRight={handleChangeBrands}
        /> */}
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
      <Stack flex={1} spacing={5}>
        {renderChart()}
      </Stack>
    </Stack>
  );
};

export default PricePage;
