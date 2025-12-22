import { create } from 'zustand';
import { initFilterPartner } from '../assets/constant/partners';
import { tPartnerStore } from '../types/partners.type';

export const usePartnersStore = create<tPartnerStore>((set) => ({
  partners: [],
  partner: null,
  formPartner: null,
  filterPartner: initFilterPartner,

  setPartnerStore: (key, value) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
}));
