import axiosInstance from './axios';

export default async function getGenderList() {
  const response = await axiosInstance.get<string[]>('/gender_list');

  return response.data;
}
