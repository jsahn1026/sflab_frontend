import { useParams } from 'react-router-dom';

export default function useSplitNameParams() {
  const { splitName } = useParams<{ splitName: string }>();

  return splitName;
}
