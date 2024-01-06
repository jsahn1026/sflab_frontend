import axiosInstance from './axios';

export type GetKeywordsParams = {
  brand_list: string[];
};

export default async function getKeywords(params: GetKeywordsParams) {
  const response = await axiosInstance.post<string[]>('/v1/keywords', params);

  return response.data;
}
