import { useQuery } from '@tanstack/react-query';
import getAveragePrice, { GetAveragePriceParams } from 'apis/getAveragePrice';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface AveragePriceQueryParams {
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

export const useAveragePriceQuery = ({
  keywords,
  ex_keywords,
  stats_name,
  drilldown_name,
  brands,
  period,
  genders,
  SKU,
  newitems,
}: AveragePriceQueryParams) => {
  const params = useMemo<GetAveragePriceParams>(
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

  const { data } = useQuery(['average_price', params], () => getAveragePrice(params));
  if (typeof(data) == "object"){
    var data_array = data as Array<any>;
    if (data_array[0]?.yAxis.labels){
    Object.keys(data_array[0]?.yAxis.labels).forEach(fomatter => {
      var f: any;
      // console.log()
      eval("f = " + data_array[0]?.yAxis.labels[fomatter]);
      data_array[0].yAxis.labels[fomatter] = f;
    });
  }}
  return useMemo(() => data ?? [], [data]);
};
