import { useQuery } from '@tanstack/react-query';
import getStats, { GetStatsParams } from 'apis/getStats';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface StatQueryParams {
  keywords: string[];
  ex_keywords: string[];
  stats_name: string;
  drilldown_name: string
  brands: string[];
  period: SettingType['period'];
  genders: string[];
  SKU: boolean;
  newitems: boolean;
}

export const useStatsQuery = ({
  keywords,
  ex_keywords,
  stats_name,
  drilldown_name,
  brands,
  period,
  genders,
  SKU,
  newitems,
}: StatQueryParams) => {
  const params = useMemo<GetStatsParams>(
    () => ({
      brands,
      keywords,
      stats_name,
      drilldown_name,
      ex_keywords,
      dates: [period.startDate, period.endDate],
      gender: genders,
      SKU,
      newitems,
    }),
    [keywords, brands, period, genders]
  );

  const { data } = useQuery(['stats', params], () => getStats(params));
  if (typeof(data) == "object"){
    var data_array = data as Array<any>;
    Object.keys(data_array[0]?.chart.events).forEach(event => {
      var f: any;
      eval("f = " + data_array[0].chart.events[event]);
      data_array[0].chart.events[event] = f;
    });
  }
  return useMemo(() => data ?? [], [data]);
};
