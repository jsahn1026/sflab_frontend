import axiosInstance from './axios';

export type GetPricesParams = {
  brands: string[];
  keywords: string[];
  dates: string[];
  gender: string[];
  ex_keywords: string[];
};

export default async function getPrices(params: GetPricesParams) {
  const response = await axiosInstance.post<[]>('/v1/prices', params);

  return response.data;
}
