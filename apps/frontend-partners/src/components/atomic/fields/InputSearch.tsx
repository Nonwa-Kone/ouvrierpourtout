import { SearchIcon } from 'lucide-react';
import React from 'react';
import { colors } from '../../../assets/constants/colors';
import { tFields } from '../../../types/fields';

export const InputSearch: React.FC<Omit<tFields, 'label'>> = ({
  type = 'text',
  name,
  placeholder,
  onChange,
  disabled,
  value,
  variant = 'quarter',
  margin = '.5rem 0',
  borderColor,
  color,
}) => {
  const variantValue: { [key: string]: string } = {
    quarter: '24%',
    half: '48%',
    third: '70%',
    full: '100%',
  };
  return (
    <div
      className='inputSearch'
      style={{ width: variantValue[variant] || variant, margin, borderColor }}
    >
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        value={value}
        style={{ color }}
      />
      <SearchIcon size={20} color={color || colors.dark[500]} />
    </div>
  );
};
