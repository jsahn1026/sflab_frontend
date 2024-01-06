import { useQuery } from '@tanstack/react-query';
import getStreamData, { GetStreamDataParams } from 'apis/getStreamData';
import { parse } from 'date-fns';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface StreamDataQueryParams {
  item: string[];
  category: string;
  brand: string[];
  gender: string[];
  period: SettingType['period'];
}

export const useStreamDataQuery = ({
  item,
  category,
  brand,
  gender,
  period,
}: StreamDataQueryParams) => {
  // const brand = useRecoilValue(brandsState);
  // const gender = useRecoilValue(genderState);
  // const period = useRecoilValue(periodState);

  const params = useMemo<GetStreamDataParams>(
    () => ({
      item,
      category,
      brand,
      gender,
      dateRange0: parse(period.startDate, 'yyyy-MM-dd', new Date()).toString(),
      dateRange1: parse(period.endDate, 'yyyy-MM-dd', new Date()).toString(),
    }),
    [item, category, brand, gender, period]
  );

  const { data } = useQuery(['stream_data', params], () =>
    getStreamData(params)
  );

  return useMemo(() => data || [], [data]);
};
