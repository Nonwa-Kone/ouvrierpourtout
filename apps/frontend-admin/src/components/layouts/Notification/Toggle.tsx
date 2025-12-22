import { BellIcon } from 'lucide-react';
import React, { useContext } from 'react';
import Button from '../../atomic/Button';
import { NotificationContext } from './NotificationBox';

export function Toggle({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useContext(NotificationContext);
  return (
    <>
      <Button Icon={<BellIcon />} onClick={() => setOpen(!open)} />
      {children}
    </>
  );
}
