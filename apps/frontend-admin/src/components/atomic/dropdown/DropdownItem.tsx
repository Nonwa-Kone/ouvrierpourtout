import { IDropdown } from './Dropdown';

const DropdownItem = ({ children, onClick }: IDropdown) => {
  return (
    <div className='dropdown-list-item' onClick={onClick}>
      <span className='dropdown-list-item-text'>{children}</span>
    </div>
  );
};

export default DropdownItem;
