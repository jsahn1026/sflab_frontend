import axiosInstance from './axios';

type GetItemListParams = {
  brands: string[];
};

export default async function getItemList({ brands }: GetItemListParams) {
  const response = await axiosInstance.post<string[]>('/v1/sub_item_list', {
    brand_list: brands,
    // params: brands.map((v) => ({ value: v, label: v })),
  });

  return response.data;
}
