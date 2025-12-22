export type tModalsName = 'modalUploaded';
export type tModalDetailOrder = 'detailOrderModal';
export type tModalDetailOrderByNotif = 'detailOrderByNotif';
export type tModalDetailCustomer = 'detailCustomerModal';
export type tModalAssignTradeBody = 'assignTradeBodyModal';
export type tModalAssignTicketSpecialist = 'assignTicketSpecialistModal';
export type tModalFilterUser = 'modalFilterUser';
export type tModalFilterTicket = 'modalFilterTicket';
export type tModalFilterCustomer = 'modalFilterCustomer';
export type tModalAvis = 'avisModal';

export type tModalFilterUserState = Record<tModalFilterUser, boolean>;
export type tModalFilterTicketState = Record<tModalFilterTicket, boolean>;
export type tModalFilterCustomerState = Record<tModalFilterCustomer, boolean>;
export type tModalsState = Record<tModalsName, boolean>;
export type tModalDetailOrderState = Record<tModalDetailOrder, boolean>;
export type tModalDetailOrderByNotifState = Record<
  tModalDetailOrderByNotif,
  boolean
>;
export type tModalDetailCustomerState = Record<tModalDetailCustomer, boolean>;
export type tModalAssignTradeBodyState = Record<tModalAssignTradeBody, boolean>;
export type tModalAvisState = Record<tModalAvis, boolean>;
export type tModalAssignTicketSpecialistState = Record<
  tModalAssignTicketSpecialist,
  boolean
>;

export type tModalsAction = {
  setModalUploadAction: (modalName: tModalsName, value: boolean) => void;
  setModalDetailOrderAction: (
    modalName: tModalDetailOrder,
    value: boolean
  ) => void;
  setModalDetailOrderByNotifAction: (
    modalName: tModalDetailOrderByNotif,
    value: boolean
  ) => void;
  setModalDetailCustomerAction: (
    modalName: tModalDetailCustomer,
    value: boolean
  ) => void;
  setModalAssignTradeBodyAction: (
    modalName: tModalAssignTradeBody,
    value: boolean
  ) => void;
  setModalAssignTicketSpecialistAction: (
    modalName: tModalAssignTicketSpecialist,
    value: boolean
  ) => void;
  setModalAvisActions: (modalName: tModalAvis, value: boolean) => void;
  setModalFilterUser: (modalName: tModalFilterUser, value: boolean) => void;
  setModalFilterTicketActions: (
    modalName: tModalFilterTicket,
    value: boolean
  ) => void;
  setModalFilterCustomerActions: (
    modalName: tModalFilterCustomer,
    value: boolean
  ) => void;
};

export type tModalsStore = tModalsState &
  tModalsAction &
  tModalDetailOrderState &
  tModalDetailOrderByNotifState &
  tModalDetailCustomerState &
  tModalAssignTradeBodyState &
  tModalAssignTicketSpecialistState &
  tModalAvisState &
  tModalFilterUserState &
  tModalFilterTicketState &
  tModalFilterCustomerState;

export type tAvisStore = {
  avis: boolean;

  setAvisStore: (
    key: keyof tAvisStore,
    value: tAvisStore[keyof tAvisStore]
  ) => void;
};
