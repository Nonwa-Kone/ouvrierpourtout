import { User2 } from 'lucide-react';
import { useContext } from 'react';
import Button from '../Button';
import { ContextDropdown, IDropdown } from './Dropdown';

const Toggle = ({ label }: IDropdown) => {
  const { open, setOpen } = useContext(ContextDropdown);
  return (
    <Button
      name='userProfile'
      id='userProfile'
      Icon={<User2 />}
      onClick={() => setOpen(!open)}
    >
      {label || null}
    </Button>
  );
};

export default Toggle;
