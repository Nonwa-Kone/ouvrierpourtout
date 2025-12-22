import { useContext } from 'react';
import { ContextDropdown, IDropdown } from './Dropdown';

const DropdownList = ({ children }: IDropdown) => {
  const { open } = useContext(ContextDropdown);
  return open && <div className='dropdown-list'>{children}</div>;
};

export default DropdownList;
