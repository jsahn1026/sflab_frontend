import axiosInstance from './axios';

export type GetStreamDataParams = {
  item: string[];
  category: string;
  brand: string[];
  gender: string[];
  dateRange0: string;
  dateRange1: string;
};

export type StreamDataResponseType = {
  name: string;
  data: [string, string][];
};

export default async function getStreamData(params: GetStreamDataParams) {
  const response = await axiosInstance.get<StreamDataResponseType[]>(
    '/stream_data',
    {
      params,
    }
  );

  return response.data;
}
