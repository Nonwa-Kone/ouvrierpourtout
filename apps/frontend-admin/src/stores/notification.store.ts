import { create } from 'zustand';
import { tNotificationAdminStore } from '../types/notification.type';

export const useNotificationStore = create<tNotificationAdminStore>((set) => ({
  notification: null,
  notifications: [],

  setNotificationAdminStore(key, value) {
    set({ [key]: value });
  },
}));
