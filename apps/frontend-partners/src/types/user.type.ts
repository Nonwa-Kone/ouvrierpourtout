export type tUser = {
  _id?: string;
  personalInfos?: tUserPersonalInfos | null;
  address: tAdresse | null;
  role?: tRole | null;
  password?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type tUserPersonalInfos = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  gender?: string | null;
  address?: tAdresse | null;
};

export type tAdresse = {
  city?: string | null;
  zipCode?: string | null;
  country?: string | null;
  street?: string | null;
};

export type tPermissions = {
  name: string | null;
  value: string | null;
  enabled: boolean | null;
};

export type tRole = {
  label?: string | null;
  description?: string | null;
  permissions?: Array<tPermissions> | null;
};

export type tUserStore = {
  users: tUser[] | [];
  user: tUser | null;
  formUser: tUser | null;
  filterUser: tUser | null;

  setUserStore: (
    key: keyof Omit<tUserStore, 'setUserStore'>,
    value: tUserStore[keyof tUserStore]
  ) => void;
};
