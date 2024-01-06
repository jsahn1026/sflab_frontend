import { useParams } from 'react-router-dom';

export default function useItemParams() {
  const { item } = useParams<{ item: string }>();

  return item ? item.replace(/-/g, '/') : '';
}
