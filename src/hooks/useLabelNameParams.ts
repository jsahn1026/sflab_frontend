import { useParams } from 'react-router-dom';

export default function useLabelNameParams() {
  const { labelName } = useParams<{ labelName: string }>();

  return labelName;
}
