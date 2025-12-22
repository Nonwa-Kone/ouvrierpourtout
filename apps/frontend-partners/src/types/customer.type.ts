export type tCustomer = {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: tAdresse;
  gender?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type tAdresse = {
  country?: string;
  city?: string;
  municipality?: string;
  street?: string;
  zipCode?: string;
};

export type tCustomerResponse = {
  message: string;
  success?: boolean;
  data?: tCustomer[];
};

export type tCustomerStore = {
  customers?: tCustomer[] | null;
  customer?: tCustomer | null;
  filterCustomer?: tCustomer | null;

  setCustomterStore?: (
    key: keyof tCustomerStore,
    value: tCustomerStore[keyof tCustomerStore]
  ) => void;
};
