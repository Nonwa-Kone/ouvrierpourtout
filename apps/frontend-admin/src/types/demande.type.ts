import { tCustomer } from './customer.type';
import { tPartner } from './partners.type';

export type tStatus =
  | 'pending'
  | 'accepted'
  | 'refused'
  | 'completed'
  | 'all'
  | 'draft'
  | 'waiting'
  | 'in_progress'
  | 'sent'
  | 'delivered'
  | 'occuped'
  | 'clotured';

export type tQuery = {
  page?: number;
  limit?: number;
  status?: tStatus;
};

export type tDemande = {
  _id?: string;
  assignTo: tPartner;
  customer?: tCustomer;
  profession?: string;
  speciality?: string;
  amount: number;
  payment_statu?: string;
  description: string;
  reference: string;
  status: tStatus;
  createdAt: string;
  updatedAt: string;
};

export type tDemandeResponse = {
  message: string;
  success?: boolean;
  data?: tDemande[];
  currentPage?: number;
  totalPage?: number;
  count?: number;
  nextPage?: number;
  prevPage?: number;
};

export type tFilterDemande = {
  searchTerm?: React.ChangeEventHandler<HTMLInputElement> | string | null;
  status?: string | null;
  jobs?: string | null;
  period?: {
    from?: Date | string | null;
    to?: Date | string | null;
  };
  limit?: number | null;
  page?: number | null;
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
