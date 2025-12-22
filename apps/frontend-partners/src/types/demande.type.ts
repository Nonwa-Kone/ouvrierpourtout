// import { tCustomer } from './customer.type';

import React from 'react';
import { tCustomer } from './customer.type';

export type tStatus =
  | ''
  | 'waiting'
  | 'pending'
  | 'accepted'
  | 'refused'
  | 'finished'
  | 'in_progress'
  | 'occuped'
  | 'clotured';

export type tQuery = {
  page?: number;
  limit?: number;
  status?: tStatus;
};

export type tDemande = {
  _id?: string;
  customer?: tCustomer;
  profession?: string;
  speciality?: string;
  amount?: number;
  description: string;
  payment_statu?: string;
  reference: string;
  order?: tDemande;
  status: tStatus;
  createdAt: string;
  updatedAt: string;
};

export type tDemandeResponse = {
  message: string;
  success?: boolean;
  data?: tDemande[];
  count?: number;
  currentPage?: number;
  totalPages?: number;
  nextPage?: number;
  prevPage?: number;
};

export type tFilterDemande = {
  profession?: string | null;
  status?: tStatus | null;
  limit?: number | null;
  page?: number | null;
  searchTerm?: React.ChangeEventHandler<HTMLInputElement> | null;
};

export type tDemandeStore = {
  demandes?: tDemande[] | null;
  demande?: tDemande | null;
  filterDemande?: tFilterDemande | null;

  setDemandeStore?: (
    key: keyof tDemandeStore,
    value: tDemandeStore[keyof tDemandeStore]
  ) => void;
};
