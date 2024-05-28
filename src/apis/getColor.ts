import axiosInstance from './axios';

export type GetColorParams = {
  brands: string[];
  keywords: string[];
  ex_keywords: string[];
  dates: string[];
  gender: string[];
  SKU: boolean;
  newitems: boolean;
};

export default async function getColor(params: GetColorParams) {
  const response = await axiosInstance.post<[]>('/v1/color', params);

  return response.data;
}
