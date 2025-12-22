// ** import Lucide Icons
import { BookUser, UserRound } from 'lucide-react';

// ** import utils
import { formatDate } from '../../../assets/utils';
import {
  statusLayout,
  statusPayment,
} from '../../../assets/utils/displayVariation';

// ** import stores
import { useModalStore } from '../../../stores/modal.store';

// ** import components
import { colors } from '../../../assets/constant/colors copy';
import { useGetAdminNotificationById } from '../../../assets/hook/notification.client';
import { useDemandeStore } from '../../../stores/demande.store';
import { useNotificationStore } from '../../../stores/notification.store';
import { tDemande } from '../../../types/demande.type';
import { TableBadge } from '../../layouts/tableLayout/TableLayout';
import Button from '../Button';
import { ModalLayout } from './ModalLayout';

export const ModalDetailOrderyNotif = () => {
  // state management
  const {
    setModalDetailOrderByNotifAction,
    setModalAssignTradeBodyAction,
    setModalAssignTicketSpecialistAction,
  } = useModalStore((s) => s);
  const setDemandeStore = useDemandeStore((s) => s.setDemandeStore);
  const notification = useNotificationStore((s) => s.notification);

  const { data, isPending } = useGetAdminNotificationById(
    notification?._id as string
  );

  // constante utility
  const { bg, color, label } = statusLayout(
    data?.data?.order?.status as string
  );
  const {
    bg: bgPayment,
    color: colorPayment,
    label: labelPayment,
  } = statusPayment(data?.data?.order?.payment_statu as string);

  return (
    <ModalLayout
      width={400}
      hiddenBtn={true}
      title={'Détail du ticket'}
      onCancel={() =>
        setModalDetailOrderByNotifAction('detailOrderByNotif', false)
      }
      onClose={() =>
        setModalDetailOrderByNotifAction('detailOrderByNotif', false)
      }
      onValidate={() =>
        setModalDetailOrderByNotifAction('detailOrderByNotif', false)
      }
    >
      <div className='modalDetailOrder-container'>
        {isPending ? (
          <p>Chargement en cours...</p>
        ) : (
          <div className='modalDetailOrder-container-body'>
            <p className='modalDetailOrder-container-body-title'>
              Information du ticket
            </p>
            <div className='modalDetailOrder-container-body-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Référence :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                <span>{data?.data?.order?.reference}</span>
              </p>
            </div>
            <div className='modalDetailOrder-container-body-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Profession :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {data?.data?.order?.profession}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Montant :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {data?.data?.order?.amount} FCFA
              </p>
            </div>
            <div className='modalDetailOrder-container-body-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Date de création :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {formatDate(
                  data?.data?.order?.createdAt as string,
                  'DD/MM/YYYY HH:mm'
                )}
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
              <p className='modalDetailOrder-container-body-item-title'>
                Nom :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {data?.data?.order?.customer?.firstName}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Prénom :{' '}
              </p>
              <p className='modalDetailOrder-container-body-item-value'>
                {data?.data?.order?.customer?.lastName}
              </p>
            </div>
            <div className='modalDetailOrder-container-body-item'>
              <p className='modalDetailOrder-container-body-item-title'>
                Téléphone :{' '}
              </p>
              <p>{data?.data?.order?.customer?.phoneNumber}</p>
            </div>
            <div className='modalDetailOrder-container-body-row'>
              <div className='modalDetailOrder-container-body-row-item'>
                <p className='modalDetailOrder-container-body-item-title'>
                  Ville :{' '}
                </p>
                <p className='modalDetailOrder-container-body-item-value'>
                  {data?.data?.order?.customer?.address?.city}
                </p>
              </div>
              <div className='modalDetailOrder-container-body-row-item'>
                <p className='modalDetailOrder-container-body-item-title'>
                  Commune :{' '}
                </p>
                <p className='modalDetailOrder-container-body-item-value'>
                  {data?.data?.order?.customer?.address?.municipality}
                </p>
              </div>
              <div className='modalDetailOrder-container-body-row-item'>
                <p className='modalDetailOrder-container-body-item-title'>
                  Rue :{' '}
                </p>
                <p className='modalDetailOrder-container-body-item-value'>
                  {data?.data?.order?.customer?.address?.street}
                </p>
              </div>
            </div>
            {data?.data?.order?.status !== 'accepted' &&
              data?.data?.order?.status !== 'clotured' && (
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
                        setDemandeStore?.(
                          'demande',
                          data?.data?.order as tDemande
                        );
                        setModalDetailOrderByNotifAction(
                          'detailOrderByNotif',
                          false
                        );
                        setModalAssignTradeBodyAction(
                          'assignTradeBodyModal',
                          true
                        );
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
                        setModalDetailOrderByNotifAction(
                          'detailOrderByNotif',
                          false
                        );
                        setModalAssignTicketSpecialistAction(
                          'assignTicketSpecialistModal',
                          true
                        );
                      }}
                    />
                  </div>
                </>
              )}
            {(data?.data?.order?.status === 'accepted' ||
              data?.data?.order?.status === 'clotured') &&
              data?.data?.order?.assignTo && (
                <>
                  <hr />
                  <p className='modalDetailOrder-container-body-title'>
                    Détail de l'ouvrier qui a accepté la data?.data?.order
                  </p>
                  <div className='modalDetailOrder-container-body-item'>
                    <p className='modalDetailOrder-container-body-item-title'>
                      Nom complet :{' '}
                    </p>
                    <p className='modalDetailOrder-container-body-item-value'>
                      {data?.data?.order?.assignTo?.personalInfos?.firstName +
                        ' ' +
                        data?.data?.order?.assignTo?.personalInfos?.lastName}
                    </p>
                  </div>
                  <div className='modalDetailOrder-container-body-item'>
                    <p className='modalDetailOrder-container-body-item-title'>
                      Numéro de téléphone :{' '}
                    </p>
                    <p className='modalDetailOrder-container-body-item-value'>
                      {data?.data?.order?.assignTo?.personalInfos?.phoneNumber}
                    </p>
                  </div>
                  <div className='modalDetailOrder-container-body-item'>
                    <p className='modalDetailOrder-container-body-item-title'>
                      Adresse :{' '}
                    </p>
                    <p className='modalDetailOrder-container-body-item-value'>
                      {data?.data?.order?.assignTo?.address?.city +
                        ' ' +
                        data?.data?.order?.assignTo?.address?.municipality +
                        ' ' +
                        data?.data?.order?.assignTo?.address?.street}
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
        )}
      </div>
    </ModalLayout>
  );
};
