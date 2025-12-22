import { create } from 'zustand';
import { initFilterUser } from '../assets/constant/user';
import { tUserStore } from '../types/user.type';

export const useUserStore = create<tUserStore>((set) => ({
  users: [],
  user: null,
  formUser: null,
  filterUser: initFilterUser,

  setUserStore: (key, value) => {
    set((state) => ({
      ...state,
      [key]: value,
    }));
  },
}));
