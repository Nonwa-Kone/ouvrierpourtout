import Skeleton from 'react-loading-skeleton';
import { useAdminNotification } from '../../../assets/hook/notification.client';
import { formatDate } from '../../../assets/utils';
import { useModalStore } from '../../../stores/modal.store';
import { useNotificationStore } from '../../../stores/notification.store';
import { tNotificationAdmin } from '../../../types/notification.type';
import { Avatar } from '../tableLayout/TableLayout';
import Notification from './NotificationBox';

export default function NotificationBox() {
  const { isPending, data } = useAdminNotification();
  const setModalDetailOrderByNotifAction = useModalStore(
    (s) => s.setModalDetailOrderByNotifAction
  );
  const setNotificationAdminStore = useNotificationStore(
    (s) => s.setNotificationAdminStore
  );
  return (
    <Notification>
      <Notification.Toggle>
        {<span className='notification-count'>{data?.count}</span>}
      </Notification.Toggle>
      <Notification.List>
        {isPending && <Skeleton count={10} />}
        {data?.data?.map((notification: tNotificationAdmin) => {
          return (
            <Notification.Item>
              <div
                className='notification-list-item-card'
                onClick={() => {
                  setNotificationAdminStore(
                    'notification',
                    notification as tNotificationAdmin
                  );
                  setModalDetailOrderByNotifAction('detailOrderByNotif', true);
                }}
              >
                <span>
                  <Avatar
                    size={60}
                    fullname={
                      notification.order?.customer?.firstName +
                      ' ' +
                      notification.order?.customer?.lastName
                    }
                  ></Avatar>{' '}
                </span>
                <span
                  style={{
                    fontWeight: `${
                      notification.isOpenned === false ? 'bold' : 'normal'
                    }`,
                  }}
                >
                  {notification.message}
                  <b style={{ marginLeft: '1rem', fontWeight: 700 }}>
                    {formatDate(
                      notification.createdAt as string,
                      'DD/MM/YYYY HH:mm'
                    )}
                  </b>
                </span>
              </div>
            </Notification.Item>
          );
        })}
      </Notification.List>
    </Notification>
  );
}
