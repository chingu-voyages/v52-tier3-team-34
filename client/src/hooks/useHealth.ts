import { useQuery } from '@tanstack/react-query';

import { fetchHealth } from '@/api/health';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth
  });
};
