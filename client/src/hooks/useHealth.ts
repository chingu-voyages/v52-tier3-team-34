import { fetchHealth } from '@/api/health';
import { useQuery } from '@tanstack/react-query';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth
  });
};
