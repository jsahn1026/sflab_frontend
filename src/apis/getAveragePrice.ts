import axiosInstance from './axios';

export type GetAveragePriceParams = {
  brands: string[];
  keywords: string[];
  stats_name: string;
  drilldown_name: string;
  dates: string[];
  gender: string[];
  ex_keywords: string[];
  SKU: boolean;
  newitems: boolean;
};

export default async function getAveragePrice(params: GetAveragePriceParams) {
  const response = await axiosInstance.post<[]>('/v1/average_price', params);

  return response.data;
}