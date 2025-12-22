import React, { createContext } from 'react';
import DropdownItem from './DropdownItem';
import DropdownList from './DropdownList';
import Toggle from './Toggle';

export interface IDropdown {
  children?: React.ReactNode;
  label?: string;
  onClick?: () => void;
}

// Définir un type pour le contexte
interface IDropdownContext {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextDropdown = createContext<IDropdownContext>({
  open: false,
  setOpen: () => {},
});

export const Dropdown = ({ children }: IDropdown) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <ContextDropdown.Provider value={{ open, setOpen }}>
      {children}
    </ContextDropdown.Provider>
  );
};

Dropdown.Toggle = Toggle;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
