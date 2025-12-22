import { create } from 'zustand';
import { tDocuemntStore } from '../types/document.type';
// import { tDocuemntStore } from '../types/document.type';

export const useDocumentStore = create<tDocuemntStore>((set) => ({
  document: null,
  documents: [],

  setDocumentStore(key, value) {
    set((state) => ({ ...state, [key]: value }));
  },
}));
