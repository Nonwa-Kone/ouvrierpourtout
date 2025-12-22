import React from 'react';

export type tCustomer = {
  _id?: string | null;
  reference?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
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
  count?: number;
  currentPage?: number;
  totalPages?: number;
  prevPage?: number;
  nextPage?: number;
};

export type tCustomerFilter = {
  gender?: string | null;
  searchTerm?: React.ChangeEventHandler<HTMLInputElement> | string | null;
  page?: number;
  limit?: number;
  period?: {
    from?: string | null;
    to?: string | null;
  };
};

export type tCustomerStore = {
  customers?: tCustomer[] | null;
  customer?: tCustomer | null;
  filterCustomer?: tCustomerFilter | null;

  setCustomerStore?: (
    key: keyof tCustomerStore,
    value: tCustomerStore[keyof tCustomerStore]
  ) => void;
};
