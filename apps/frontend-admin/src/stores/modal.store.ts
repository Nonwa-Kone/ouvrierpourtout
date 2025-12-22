import { create } from 'zustand';
import {
  tAvisStore,
  tModalAssignTicketSpecialist,
  tModalAssignTradeBody,
  tModalAvis,
  tModalDetailCustomer,
  tModalDetailOrder,
  tModalFilterCustomer,
  tModalFilterTicket,
  tModalFilterUser,
  tModalsName,
  tModalsStore,
} from '../types/modal.type';
import { tModalDetailOrderByNotif } from './../types/modal.type';

export const useModalStore = create<tModalsStore>((set) => ({
  modalUploaded: false,
  detailOrderModal: false,
  detailCustomerModal: false,
  assignTradeBodyModal: false,
  assignTicketSpecialistModal: false,
  avisModal: false,
  modalFilterUser: false,
  modalFilterTicket: false,
  modalFilterCustomer: false,
  detailOrderByNotif: false,

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
  setModalAssignTradeBodyAction(
    modalName: tModalAssignTradeBody,
    value: boolean
  ) {
    set({ [modalName]: value });
  },
  setModalAssignTicketSpecialistAction(
    modalName: tModalAssignTicketSpecialist,
    value: boolean
  ) {
    set({ [modalName]: value });
  },
  setModalAvisActions(modalName: tModalAvis, value: boolean) {
    set({ [modalName]: value });
  },
  setModalFilterUser(modalName: tModalFilterUser, value: boolean) {
    set({ [modalName]: value });
  },
  setModalFilterTicketActions(modalName: tModalFilterTicket, value: boolean) {
    set({ [modalName]: value });
  },
  setModalFilterCustomerActions(
    modalName: tModalFilterCustomer,
    value: boolean
  ) {
    set({ [modalName]: value });
  },
  setModalDetailOrderByNotifAction(
    modalName: tModalDetailOrderByNotif,
    value: boolean
  ) {
    set({ [modalName]: value });
  },
}));

export const useAvisStore = create<tAvisStore>((set) => ({
  avis: false,
  setAvisStore(key, value) {
    set({ [key]: value });
  },
}));
