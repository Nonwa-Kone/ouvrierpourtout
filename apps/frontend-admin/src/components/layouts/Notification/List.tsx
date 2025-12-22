import { useContext } from 'react';
import { NotificationContext } from './NotificationBox';

export function List({ children }: { children: React.ReactNode }) {
  const { open } = useContext(NotificationContext);
  return open && <ul className='notification-list'>{children}</ul>;
}
