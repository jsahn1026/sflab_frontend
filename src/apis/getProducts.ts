import axiosInstance from './axios';

export type GetProductParams = {
  brand: string;
  keywords: string[];
  index: number;
  show: number;
  dates: string[];
  gender: string[];
};

export type ProductType = {
  이름: string;
  main_category: string;
  'small_category ': string;
  원가: string;
  세일가: string;
  fabric: string;
  date: string;
  crawlingTargetId: string;
  item_no: string;
  image: string;
};

export type ProductResponseType = {
  '#pages': number;
  items: ProductType[];
};

export default async function getProducts(params: GetProductParams) {
  const response = await axiosInstance.post<ProductResponseType>(
    '/v1/products',
    params
  );

  return response.data;
}
