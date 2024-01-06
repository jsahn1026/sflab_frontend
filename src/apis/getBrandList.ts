import axiosInstance from './axios';

export default async function getBrandList() {
  const response = await axiosInstance.get<string[]>('/brand_list');

  return response.data;
}
