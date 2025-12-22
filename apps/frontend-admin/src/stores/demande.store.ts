import { create } from 'zustand';
import { initFilterTicket } from '../assets/constant/user';
import { tDemandeStore } from '../types/demande.type';

export const useDemandeStore = create<tDemandeStore>((set) => ({
  demandes: [],
  demande: null,
  filterDemands: initFilterTicket,

  setDemandeStore: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
