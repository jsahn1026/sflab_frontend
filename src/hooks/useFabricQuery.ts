import { useQuery } from '@tanstack/react-query';
import getFabric, { GetFabricParams } from 'apis/getFabric';
import { useMemo } from 'react';
import { SettingType } from 'store/setting';

interface FabricQueryParams {
  keywords: string[];
  ex_keywords: string[];
  brands: string[];
  period: SettingType['period'];
  genders: string[];
  SKU: boolean;
  newitems: boolean;
}

export const useFabricQuery = ({
  keywords,
  ex_keywords,
  brands,
  period,
  genders,
  SKU,
  newitems,
}: FabricQueryParams) => {
  const params = useMemo<GetFabricParams>(
    () => ({
      brands,
      keywords,
      ex_keywords,
      dates: [period.startDate, period.endDate],
      gender: genders,
      SKU,
      newitems,
    }),
    [keywords, brands, period, genders]
  );

  const { data } = useQuery(['fabric', params], () => getFabric(params));
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
