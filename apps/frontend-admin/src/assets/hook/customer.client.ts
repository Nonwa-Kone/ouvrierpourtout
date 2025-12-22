import { getCustomers } from '../../api/customer.api';

import { useQuery } from '@tanstack/react-query';
import { tCustomerFilter } from '../../types/customer.type';

export const useCustomerData = (filter: tCustomerFilter) => {
  return useQuery({
    queryKey: ['customers', 'list', ...(filter ? Object.values(filter) : [])],
    queryFn: async () => await getCustomers(filter),
  });
};
