import { useModalStore } from '../../../store/modal.store'
import { ModalAssignTicketSpecialist } from './ModalAssignTicketSpecialist'
import { ModalSuccess } from './ModalSuccess'

export const ModalRender = () => {
  const modalsStore = useModalStore()
  return (
    <>
      {modalsStore.assignTicketSpecialistModal && (
        <ModalAssignTicketSpecialist />
      )}
      {modalsStore.successModal && <ModalSuccess />}
    </>
  )
}
