import { useModalStore } from '../../../stores/modal.store';
import { ModalAssignTicketSpecialist } from './ModalAssignTicketSpecialist';
import { ModalAssignTradeBody } from './ModalAssignTradeBody';
import { ModalAvis } from './ModalAvis';
import { ModalDetailCustomer } from './ModalDetailCustomer';
import { ModalDetailOrder } from './ModalDetailOrder';
import { ModalDetailOrderyNotif } from './ModalDetailOrderByNotif';
import { ModalFilterCustomer } from './ModalFilterCustomer';
import { ModalFilterTicket } from './ModalFilterTicket';
import { ModalFilterUser } from './ModalFilterUser';
import { UploadDocument } from './UploadDocument';

export const ModalRender = () => {
  const modalsStore = useModalStore();
  return (
    <>
      {modalsStore.modalUploaded && <UploadDocument />}
      {modalsStore.detailOrderModal && <ModalDetailOrder />}
      {modalsStore.detailOrderByNotif && <ModalDetailOrderyNotif />}
      {modalsStore.detailCustomerModal && <ModalDetailCustomer />}
      {modalsStore.assignTradeBodyModal && <ModalAssignTradeBody />}
      {modalsStore.assignTicketSpecialistModal && (
        <ModalAssignTicketSpecialist />
      )}
      {modalsStore.avisModal && <ModalAvis />}
      {modalsStore.modalFilterUser && <ModalFilterUser />}
      {modalsStore.modalFilterTicket && <ModalFilterTicket />}
      {modalsStore.modalFilterCustomer && <ModalFilterCustomer />}
    </>
  );
};
