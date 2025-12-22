import { tDemande } from './demande.type';

export type tNotificationAdmin = {
  _id?: string;
  message?: string;
  order?: tDemande;
  isOpenned?: boolean;
  createdAt?: Date | string;
  updateAt?: Date | string;
};

export type tResponseNotification = {
  message?: string;
  data?: Array<tNotificationAdmin>;
  success?: boolean;
  count: number;
};

export type tResponseNotificationSingle = {
  message?: string;
  data?: tNotificationAdmin;
  success?: boolean;
};

export type tNotificationAdminStore = {
  notifications?: Array<tNotificationAdmin>;
  notification?: tNotificationAdmin | null;
  setNotificationAdminStore: (
    key: keyof tNotificationAdminStore,
    value: tNotificationAdminStore[keyof tNotificationAdminStore]
  ) => void;
};
