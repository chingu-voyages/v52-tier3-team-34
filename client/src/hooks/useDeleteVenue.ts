import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteVenue } from '@/api/venues';

export function useDeleteVenue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVenue,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['venues']
      });
    },
    onError: (error) => {
      console.error('Error deleting venue:', error);
    }
  });
}
