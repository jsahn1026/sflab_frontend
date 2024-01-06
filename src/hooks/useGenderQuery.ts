import { useQuery } from '@tanstack/react-query';
import getGenderList from 'apis/getGenderList';
import { useMemo } from 'react';

export const useGenderQuery = () => {
  const { data } = useQuery(['gender_list'], getGenderList);

  return useMemo(() => data || [], [data]);
};
