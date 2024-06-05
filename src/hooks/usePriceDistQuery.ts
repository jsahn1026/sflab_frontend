import { useQuery } from '@tanstack/react-query';
import getPriceDist, { GetPriceDistParams } from 'apis/getPriceDist';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface PriceDistQueryParams {
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

export const usePriceDistQuery = ({
  keywords,
  ex_keywords,
  stats_name,
  drilldown_name,
  brands,
  period,
  genders,
  SKU,
  newitems,
}: PriceDistQueryParams) => {
  const params = useMemo<GetPriceDistParams>(
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

  const { data } = useQuery(['price_distribution', params], () => getPriceDist(params));
  // if (typeof(data) == "object"){
  //   var data_array = data as Array<any>;
  //   if (data_array[0]?.chart.events){
  //     Object.keys(data_array[0]?.chart.events).forEach(event => {
  //       var f: any;
  //       eval("f = " + data_array[0].chart.events[event]);
  //       data_array[0].chart.events[event] = f;
  //     });
  //   }}
  return useMemo(() => data ?? [], [data]);
};
