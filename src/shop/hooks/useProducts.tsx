import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { getProductsAction } from '../actions/get-products.action';

export const useProducts = () => {
  // Todo: viene lógica
  const [searchParams] = useSearchParams();

  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;

  const offset = (Number(page) - 1) * Number(limit);

  return useQuery({
    queryKey: ['products', { offset, limit }],
    queryFn: () =>
      getProductsAction({
        limit: isNaN(+limit) ? 9 : limit,
        offset: isNaN(offset) ? 0 : offset,
      }),
    staleTime: 1000 * 60 * 5,
  });
};
