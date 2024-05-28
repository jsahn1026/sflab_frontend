import { useQuery } from '@tanstack/react-query';
import getPrices, { GetPricesParams } from 'apis/getPrices';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface PriceQueryParams {
  keywords: string[];
  ex_keywords: string[];
  brands: string[];
  period: SettingType['period'];
  genders: string[];
  SKU: boolean;
  newitems: boolean;
}

export const usePricesQuery = ({
  keywords,
  ex_keywords,
  brands,
  period,
  genders,
  SKU,
  newitems,
}: PriceQueryParams) => {
  const params = useMemo<GetPricesParams>(
    () => ({
      brands,
      keywords,
      ex_keywords,
      dates: [period.startDate, period.endDate],
      gender: genders,
      SKU,
      newitems,
    }),
    [keywords, brands, period, genders, ex_keywords]
  );

  const { data } = useQuery(['prices', params], () => getPrices(params));

  return useMemo(() => data ?? [], [data]);
};
