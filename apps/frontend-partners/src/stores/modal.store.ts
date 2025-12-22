import { create } from 'zustand';
import {
  tModalDetailCustomer,
  tModalDetailOrder,
  tModalEditOrder,
  tModalFilterOrder,
  tModalsName,
  tModalsStore,
} from '../types/modal.type';

export const useModalStore = create<tModalsStore>((set) => ({
  modalUploaded: false,
  detailOrderModal: false,
  detailCustomerModal: false,
  filterOrderModal: false,
  editOrderModal: false,

  setModalUploadAction(modalName: tModalsName, value: boolean) {
    set({ [modalName]: value });
  },
  setModalDetailOrderAction(modalName: tModalDetailOrder, value: boolean) {
    set({ [modalName]: value });
  },
  setModalDetailCustomerAction(
    modalName: tModalDetailCustomer,
    value: boolean
  ) {
    set({ [modalName]: value });
  },
  setModalFilterOrderAction(modalName: tModalFilterOrder, value: boolean) {
    set({ [modalName]: value });
  },
  setModalEditOrderAction(modalName: tModalEditOrder, value: boolean) {
    set({ [modalName]: value });
  },
}));
