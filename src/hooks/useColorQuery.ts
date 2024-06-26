import { useQuery } from '@tanstack/react-query';
import getColor, { GetColorParams } from 'apis/getColor';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface ColorQueryParams {
  keywords: string[];
  ex_keywords: string[];
  brands: string[];
  period: SettingType['period'];
  genders: string[];
  SKU: boolean;
  newitems: boolean;
}

export const useColorQuery = ({
  keywords,
  ex_keywords,
  brands,
  period,
  genders,
  SKU,
  newitems,
}: ColorQueryParams) => {
  const params = useMemo<GetColorParams>(
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

  const { data } = useQuery(['color', params], () => getColor(params));

  return useMemo(() => data ?? [], [data]);
};
