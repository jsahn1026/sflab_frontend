import { useParams } from 'react-router-dom';

export default function useStatsNameParams() {
  const { stats_name } = useParams<{ stats_name: string }>();

  return stats_name ? stats_name.replace(/-/g, '/') : '';
}
