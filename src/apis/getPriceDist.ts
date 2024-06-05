import axiosInstance from './axios';

export type GetPriceDistParams = {
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

export default async function getPriceDist(params: GetPriceDistParams) {
  const response = await axiosInstance.post<[]>('/v1/get_stats', params);

  return response.data;
}