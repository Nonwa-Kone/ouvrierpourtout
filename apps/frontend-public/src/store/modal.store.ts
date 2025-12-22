import { create } from 'zustand'
import {
  tModalAssignTicketSpecialist,
  tModalsStore,
  tModalSuccess,
} from '../types/modal.type'

export const useModalStore = create<tModalsStore>((set) => ({
  assignTicketSpecialistModal: false,
  successModal: false,

  setModalAssignTicketSpecialistAction(
    modalName: tModalAssignTicketSpecialist,
    value: boolean,
  ) {
    set({ [modalName]: value })
  },
  setModalSuccessAction(modalName: tModalSuccess, value: boolean) {
    set({ [modalName]: value })
  },
}))
