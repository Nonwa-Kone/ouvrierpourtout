export type tModalsName = 'modalUploaded';
export type tModalDetailOrder = 'detailOrderModal';
export type tModalDetailCustomer = 'detailCustomerModal';
export type tModalEditOrder = 'editOrderModal';
export type tModalFilterOrder = 'filterOrderModal';

export type tModalsState = Record<tModalsName, boolean>;
export type tModalDetailOrderState = Record<tModalDetailOrder, boolean>;
export type tModalDetailCustomerState = Record<tModalDetailCustomer, boolean>;
export type tModalFilterOrderState = Record<tModalFilterOrder, boolean>;
export type tModalEditOrderState = Record<tModalEditOrder, boolean>;

export type tModalsAction = {
  setModalUploadAction: (modalName: tModalsName, value: boolean) => void;
  setModalDetailOrderAction: (
    modalName: tModalDetailOrder,
    value: boolean
  ) => void;
  setModalDetailCustomerAction: (
    modalName: tModalDetailCustomer,
    value: boolean
  ) => void;
  setModalFilterOrderAction: (
    modalName: tModalFilterOrder,
    value: boolean
  ) => void;
  setModalEditOrderAction: (modalName: tModalEditOrder, value: boolean) => void;
};

export type tModalsStore = tModalsState &
  tModalsAction &
  tModalDetailOrderState &
  tModalDetailCustomerState &
  tModalFilterOrderState &
  tModalEditOrderState;
