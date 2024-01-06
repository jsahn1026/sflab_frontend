import { useQuery } from '@tanstack/react-query';
import getProducts, { GetProductParams } from 'apis/getProducts';
import { useMemo } from 'react';

interface FabricDataQueryParams {
  brand: string;
  keywords: string[];
  index: number;
  show: number;
  dates: string[];
  genders: string[];
}

export const useProductQuery = ({
  brand,
  keywords,
  index,
  show,
  dates,
  genders,
}: FabricDataQueryParams) => {
  const params = useMemo<GetProductParams>(
    () => ({
      brand,
      index,
      show,
      keywords,
      dates,
      gender: genders,
    }),
    [brand, keywords, index, show, dates, genders]
  );

  const { data } = useQuery(['products', params], () => getProducts(params));

  return useMemo(() => data, [data]);
};
