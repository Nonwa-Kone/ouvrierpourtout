import React from 'react';
import PhoneField from 'react-phone-number-input';
import { tFields, tVariantNames } from '../../../types/fields';

export const PhoneInput: React.FC<tFields & { onChange: (e: any) => void }> = ({
  label,
  name,
  onChange,
  disabled,
  value,
  variant = 'quarter',
  margin = '.5rem 0',
  placeholder = '07 00 00 00 00',
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
      style={{ width: variantValue[variant] || variant, margin }}
    >
      <label>{label}</label>
      <div className='input-inputBlock' style={{ gap: '.5rem' }}>
        <PhoneField
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={(e) => onChange(e)}
          country='CI'
        />
      </div>
    </div>
  );
};
