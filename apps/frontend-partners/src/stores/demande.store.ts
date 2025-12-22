import { create } from 'zustand';
import initFilterDemande from '../assets/constant/demande';
import { tDemandeStore } from '../types/demande.type';
// import { tDemandeStore } from '../types/demande.type';

export const useDemandeStore = create<tDemandeStore>((set) => ({
  demands: [],
  demande: null,
  filterDemands: initFilterDemande,

  setDemandeStore: (key, value) => set((state) => ({ ...state, [key]: value })),
}));
