import { tCustomerFilter } from '../../types/customer.type';
import { tFilterDemande } from '../../types/demande.type';
import { tFilterUser, tPermissions, tUser } from '../../types/user.type';

export const permissions: Array<tPermissions> = [
  {
    name: 'Ajouter un utilisateur',
    value: 'add_user',
    enabled: false,
  },
  {
    name: 'Lire la liste des utilisateurs',
    value: 'read_list_user',
    enabled: false,
  },
  {
    name: 'Voir detail des utilisateurs',
    value: 'read_user_detail',
    enabled: false,
  },
  {
    name: 'Supprimer un membre',
    value: 'delete_user',
    enabled: false,
  },
  {
    name: 'Ajouter un ouvrier',
    value: 'add_ouvrier',
    enabled: false,
  },
  {
    name: 'Voir la liste des ouvriers',
    value: 'read_list_ouvrier',
    enabled: false,
  },
  {
    name: "Modifier information d'un ouvrier",
    value: 'update_info_ouvrier',
    enabled: false,
  },
  {
    name: 'Supprimer un ouvrier',
    value: 'delete_ouvrier',
    enabled: false,
  },
  {
    name: "Activer et désactiver le compte d'un ouvrier",
    value: 'toggle_active_compte_ouvrier',
    enabled: false,
  },
];

export const initUser: tUser = {
  personalInfos: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
  },
  address: {
    street: 'Yopougon Kouté',
    city: 'Abidjan',
    zipCode: '00225',
    country: "Côte d'Ivoire",
  },
  role: {
    label: '',
    description: '',
    permissions: permissions,
  },
  password: '',
};

export const initFilterUser: tFilterUser = {
  searchTerm: null,
  gender: null,
  role: null,
  limit: 10,
  page: 1,
};

export const initFilterTicket: tFilterDemande = {
  status: '',
  jobs: null,
  period: {
    from: null,
    to: null,
  },
  limit: 10,
  page: 1,
};

export const initFilterCustomer: tCustomerFilter = {
  searchTerm: null,
  gender: null,
  limit: 10,
  page: 1,
  period: {
    from: null,
    to: null,
  },
};
