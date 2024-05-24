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
  상품명: any;
  이름: string;
  상위범주: string;
  하위범주: string;
  // 원가: string;
  // 세일가: string;
  소재: string;
  date: string;
  crawlingTargetId: string;
  item_no: string;
  image: string;
  상품상세정보: string;
  색상: string;
  사이즈: string;
  제조국: string;
  판매가: string;
  main_category: string;
  mid_category: string;
  small_category: string;
  collar: string;
  shape: string;
  length: string;
  sleeve_length: string;
  texture: string;
  color: string;
  print: string;
  fiber: string;
  fabric: string;
  woven: string;
  neckline: string;
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
