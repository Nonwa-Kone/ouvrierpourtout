import { useModalStore } from '../../../stores/modal.store';
import { ModalDetailOrder } from './ModalDetailOrder';
import { ModalEditOrder } from './ModalEditOrder';
import { ModalFilterOrder } from './ModalFilterOrder';
import { UploadDocument } from './UploadDocument';

export const ModalRender = () => {
  const modalsStore = useModalStore();
  return (
    <>
      {modalsStore.modalUploaded && <UploadDocument />}{' '}
      {modalsStore.detailOrderModal && <ModalDetailOrder />}
      {modalsStore.filterOrderModal && <ModalFilterOrder />}
      {modalsStore.editOrderModal && <ModalEditOrder />}
    </>
  );
};
