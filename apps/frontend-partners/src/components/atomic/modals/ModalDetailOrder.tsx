import { formatDate } from '../../../assets/utils';
import {
  statusLayout,
  statusPayment,
} from '../../../assets/utils/displayVariation';
import { useDemandeStore } from '../../../stores/demande.store';
// import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';
import { TableBadge } from '../../layouts/tableLayout/TableLayout';
import { ModalLayout } from './ModalLayout';

export const ModalDetailOrder = () => {
  const { setModalDetailOrderAction } = useModalStore((s) => s);
  const demande = useDemandeStore((s) => s.demande);

  const { bg, color, label } = statusLayout(demande?.status as string);
  const {
    bg: bgPayment,
    color: colorPayment,
    label: labelPayment,
  } = statusPayment(demande?.payment_statu as string);
  return (
    <ModalLayout
      width={400}
      hiddenBtn={true}
      title={'Detail de la commande'}
      onCancel={() => setModalDetailOrderAction('detailOrderModal', false)}
      onClose={() => setModalDetailOrderAction('detailOrderModal', false)}
      onValidate={() => setModalDetailOrderAction('detailOrderModal', false)}
    >
      <div className='modalDetailOrder-container'>
        <div className='modalDetailOrder-container-body'>
          <p className='modalDetailOrder-container-body-title'>
            Information du ticket
          </p>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Référence :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              <span>{demande?.reference}</span>
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Profession :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {demande?.profession}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Montant :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {demande?.amount} FCFA
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              status :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              <TableBadge label={label} bg={bg} color={color} />
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Date de création :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {formatDate(demande?.createdAt as string, 'DD/MM/YYYY HH:mm')}
            </p>
          </div>
          <hr />
          <p className='modalDetailOrder-container-body-title'>
            Information du client
          </p>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>Nom : </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {demande?.customer?.firstName}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Prénom :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {demande?.customer?.lastName}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Téléphone :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {demande?.customer?.phoneNumber}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Téléphone :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {demande?.customer?.email}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-row'>
            <div className='modalDetailOrder-container-body-row-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Ville :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {demande?.customer?.address?.city}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-row-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Commune :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {demande?.customer?.address?.municipality}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-row-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Rue :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {demande?.customer?.address?.street}
              </p>
            </div>
          </div>
          <hr />
          <p className='modalDetailOrder-container-body-title'>Facturation</p>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Facture :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              <TableBadge
                label={labelPayment}
                bg={bgPayment}
                color={colorPayment}
              />
            </p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
};
