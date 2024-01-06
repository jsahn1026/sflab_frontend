import { useQuery } from '@tanstack/react-query';
import getItemList from 'apis/getItemList';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { brandsState } from 'store/setting';

export const useItemQuery = () => {
  const brand_list = useRecoilValue(brandsState);

  const { data } = useQuery(['item_list'], () => getItemList({ brand_list }), {
    enabled: brand_list.length > 0,
  });

  return useMemo(() => data || [], [data]);
};
