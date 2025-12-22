export type tModalAssignTicketSpecialist = 'assignTicketSpecialistModal'
export type tModalSuccess = 'successModal'

export type tModalAssignTicketSpecialistState = Record<
  tModalAssignTicketSpecialist,
  boolean
>
export type tModalSuccessState = Record<tModalSuccess, boolean>

export type tModalsAction = {
  setModalAssignTicketSpecialistAction: (
    modalName: tModalAssignTicketSpecialist,
    value: boolean,
  ) => void
  setModalSuccessAction: (modalName: tModalSuccess, value: boolean) => void
}

export type tModalsStore = tModalsAction &
  tModalAssignTicketSpecialistState &
  tModalSuccessState
