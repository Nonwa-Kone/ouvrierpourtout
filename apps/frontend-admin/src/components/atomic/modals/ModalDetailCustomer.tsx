import { formatDate } from '../../../assets/utils';
import { genderLabel } from '../../../assets/utils/displayVariation';
import { useCustomerStore } from '../../../stores/customer.store';
import { useModalStore } from '../../../stores/modal.store';
import { ModalLayout } from './ModalLayout';

export const ModalDetailCustomer = () => {
  const setModalDetailCustomerAction = useModalStore(
    (s) => s.setModalDetailCustomerAction
  );
  const customer = useCustomerStore((s) => s.customer);
  return (
    <ModalLayout
      width={400}
      title={'Detail du client'}
      hiddenBtn={true}
      onCancel={() =>
        setModalDetailCustomerAction('detailCustomerModal', false)
      }
      onClose={() => setModalDetailCustomerAction('detailCustomerModal', false)}
      onValidate={() =>
        setModalDetailCustomerAction('detailCustomerModal', false)
      }
    >
      <div className='modalDetailOrder-container'>
        <div className='modalDetailOrder-container-body'>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Référence :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {customer?.reference}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>Nom : </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {customer?.firstName}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Prénom :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {customer?.lastName}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Téléphone :{' '}
            </p>
            <p>{customer?.phoneNumber}</p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Genre :{' '}
            </p>
            <p>{genderLabel(customer?.gender as string)}</p>
          </div>
          <div className='modalDetailOrder-container-body-row'>
            <div className='modalDetailOrder-container-body-row-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Ville :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {customer?.address?.city}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-row-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Commune :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {customer?.address?.municipality}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-row-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Rue :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {customer?.address?.street}
              </p>
            </div>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Date de création :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {formatDate(customer?.createdAt as string, 'DD/MM/YYYY HH:mm')}
            </p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};
