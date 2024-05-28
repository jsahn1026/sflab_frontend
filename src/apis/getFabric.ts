import axiosInstance from './axios';

export type GetFabricParams = {
  brands: string[];
  keywords: string[];
  dates: string[];
  gender: string[];
  ex_keywords: string[];
};

export default async function getFabric(params: GetFabricParams) {
  const response = await axiosInstance.post<[]>('/v1/fabric', params);

  return response.data;
}