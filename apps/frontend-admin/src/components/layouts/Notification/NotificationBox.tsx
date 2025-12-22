import React, { createContext } from 'react';
import { Item } from './Item';
import { List } from './List';
import { Toggle } from './Toggle';

export type NotificationContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  open: false,
  setOpen: () => {},
});

export default function Notification({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <NotificationContext.Provider value={{ open, setOpen }}>
      {children}
    </NotificationContext.Provider>
  );
}

Notification.Toggle = Toggle;
Notification.List = List;
Notification.Item = Item;
