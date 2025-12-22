// ** import Lucide Icons
import { BookUser, UserRound } from 'lucide-react';

// ** import utils
import { formatDate } from '../../../assets/utils';
import {
  statusLayout,
  statusPayment,
} from '../../../assets/utils/displayVariation';

// ** import stores
import { useDemandeStore } from '../../../stores/demande.store';
import { useModalStore } from '../../../stores/modal.store';

// ** import components
import { colors } from '../../../assets/constant/colors copy';
import { TableBadge } from '../../layouts/tableLayout/TableLayout';
import Button from '../Button';
import { ModalLayout } from './ModalLayout';

export const ModalDetailOrder = () => {
  // state management
  const {
    setModalDetailOrderAction,
    setModalAssignTradeBodyAction,
    setModalAssignTicketSpecialistAction,
  } = useModalStore((s) => s);
  const demande = useDemandeStore((s) => s.demande);
  // constante utility
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
      title={'Détail du ticket'}
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
              Date de création :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              {formatDate(demande?.createdAt as string, 'DD/MM/YYYY HH:mm')}
            </p>
          </div>
          <div className='modalDetailOrder-container-body-item'>
            <p className='modalDetailOrder-container-body-item-title'>
              Status :{' '}
            </p>
            <p className='modalDetailOrder-container-body-item-value'>
              <TableBadge label={label} bg={bg} color={color} />
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
            <p>{demande?.customer?.phoneNumber}</p>
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
          {demande?.status !== 'accepted' && demande?.status !== 'clotured' && (
            <>
              <hr />
              <div className='modalDetailOrder-container-body-item'>
                <p className='modalDetailOrder-container-body-item-title'>
                  Assigné le ticket :{' '}
                </p>
              </div>
              <div className='modalDetailOrder-container-body-item'>
                <Button
                  Icon={<BookUser />}
                  size='small'
                  style={{
                    flex: 1,
                    backgroundColor: colors.primary['100'],
                    color: colors.primary['500'],
                    borderColor: colors.primary['500'],
                    borderWidth: '0.5',
                  }}
                  onClick={() => {
                    setModalDetailOrderAction('detailOrderModal', false);
                    setModalAssignTradeBodyAction('assignTradeBodyModal', true);
                  }}
                />
                <Button
                  Icon={<UserRound />}
                  size='small'
                  style={{
                    flex: 1,
                    backgroundColor: colors.warning['100'],
                    color: colors.warning['500'],
                    borderColor: colors.warning['500'],
                    borderWidth: '0.5',
                  }}
                  onClick={() => {
                    setModalDetailOrderAction('detailOrderModal', false);
                    setModalAssignTicketSpecialistAction(
                      'assignTicketSpecialistModal',
                      true
                    );
                  }}
                />
              </div>
            </>
          )}
          {(demande?.status === 'accepted' || demande?.status === 'clotured') &&
            demande?.assignTo && (
              <>
                <hr />
                <p className='modalDetailOrder-container-body-title'>
                  Détail de l'ouvrier qui a accepté la demande
                </p>
                <div className='modalDetailOrder-container-body-item'>
                  <p className='modalDetailOrder-container-body-item-title'>
                    Nom complet :{' '}
                  </p>
                  <p className='modalDetailOrder-container-body-item-value'>
                    {demande?.assignTo?.personalInfos?.firstName +
                      ' ' +
                      demande?.assignTo?.personalInfos?.lastName}
                  </p>
                </div>
                <div className='modalDetailOrder-container-body-item'>
                  <p className='modalDetailOrder-container-body-item-title'>
                    Numéro de téléphone :{' '}
                  </p>
                  <p className='modalDetailOrder-container-body-item-value'>
                    {demande?.assignTo?.personalInfos?.phoneNumber}
                  </p>
                </div>
                <div className='modalDetailOrder-container-body-item'>
                  <p className='modalDetailOrder-container-body-item-title'>
                    Adresse :{' '}
                  </p>
                  <p className='modalDetailOrder-container-body-item-value'>
                    {demande?.assignTo?.address?.city +
                      ' ' +
                      demande?.assignTo?.address?.municipality +
                      ' ' +
                      demande?.assignTo?.address?.street}
                  </p>
                </div>
                <hr />
              </>
            )}
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
