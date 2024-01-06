import { useQuery } from '@tanstack/react-query';
import getBrandList from 'apis/getBrandList';
import { useMemo } from 'react';

export const useBrandQuery = () => {
  const { data } = useQuery(['brand_list'], getBrandList);

  return useMemo(() => data || [], [data]);
};
