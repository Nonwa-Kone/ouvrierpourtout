import { create } from 'zustand';
import { initFilterCustomer } from '../assets/constant/user';
import { tCustomerStore } from '../types/customer.type';

export const useCustomerStore = create<tCustomerStore>((set) => ({
  customers: [],
  customer: null,
  filterCustomer: initFilterCustomer,

  setCustomerStore: (key, value) =>
    set((state) => ({ ...state, [key]: value })),
}));
