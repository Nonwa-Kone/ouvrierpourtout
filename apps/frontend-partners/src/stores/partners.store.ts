import { create } from 'zustand';
import { tPartnerStore } from '../types/partners.type';

export const usePartnersStore = create<tPartnerStore>((set) => ({
  partners: [],
  partner: null,
  formPartner: null,
  filterPartner: null,

  setPartnerStore: (key, value) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
}));
