import { useQuery } from '@tanstack/react-query';
import getKeywords, { GetKeywordsParams } from 'apis/getKeywords';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { brandsState } from 'store/setting';

export const useKeywordQuery = () => {
  const brand_list = useRecoilValue(brandsState);

  const params = useMemo<GetKeywordsParams>(
    () => ({
      brand_list,
    }),
    [brand_list]
  );

  const { data } = useQuery(['keywords', params], () => getKeywords(params));

  return useMemo(() => data || [], [data]);
};
