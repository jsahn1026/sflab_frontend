import axiosInstance from './axios';

type GetItemListParams = {
  brand_list: string[];
};

export default async function getItemList(params: GetItemListParams) {
  const response = await axiosInstance.post<string[]>('/v1/item_list', params);

  return response.data;
}
