import React, {
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import {} from '../../../assets/utils';
// import { tFields, tVariantNames } from '../../../types/fields';

export type tVariantNames = 'quarter' | 'half' | 'third' | 'full';

export interface tFields {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  value?: string;
  variant?: tVariantNames | number;
  margin?: string | number;
  borderColor?: string;
  color?: string;
  icon?: ReactNode;
  iconPassword?: ReactNode;
  defaultValue?: string;
  autoComplete?: 'off' | 'on';
  onKeyPress?: KeyboardEventHandler<HTMLInputElement>;
}

export interface tSelect {
  options: { name: string; value: string }[];
  defaultValue?: { name: string; value: string } | string;
  required?: boolean;
  width?: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Input: React.FC<tFields> = ({
  defaultValue,
  label,
  type = 'text',
  name,
  placeholder,
  onChange,
  disabled,
  value,
  variant = 'quarter',
  margin = '.5rem 0',
  icon,
  iconPassword,
  autoComplete = 'off',
  onKeyPress,
}) => {
  const variantValue: Record<tVariantNames, string> = {
    quarter: '24%',
    half: '48%',
    third: '70%',
    full: '100%',
  };

  return (
    <div
      className='input'
      style={{
        width: variantValue[variant as tVariantNames] || variant,
        margin,
      }}
    >
      <label>{label}</label>
      <div className='input-inputBlock' style={{ gap: '.5rem' }}>
        {icon}
        <input
          defaultValue={defaultValue}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          value={value}
          className='input-inputBlock-input'
          autoComplete={autoComplete}
          onKeyPress={onKeyPress}
          pattern='/^[a-zA-Z0-9 ]*$/'
          title='Autorise seulement lettres, chiffres et espaces'
        />
        {iconPassword && iconPassword}
      </div>
    </div>
  );
};
