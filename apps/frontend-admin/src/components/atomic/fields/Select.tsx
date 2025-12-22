import React, { ChangeEventHandler, ReactNode } from 'react';
import { tVariantNames } from '../Select';
// import { tSelect } from './Input';
// import { tFields, tSelect, tVariantNames } from '../../../types/fields';
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
  // defaultValue?: string;
  autoComplete?: 'off' | 'on';
  onKeyPress?: ChangeEventHandler<HTMLInputElement>;
}
export interface tSelect {
  options: { name: string; value: string }[];
  defaultValue?: { name?: string; value?: string } | string;
  required?: boolean;
  width?: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

interface iSelectExtend extends Omit<tFields, 'onChange' | 'type'>, tSelect {}

export const Select: React.FC<iSelectExtend> = ({
  label,
  name,
  onChange,
  variant = 'quarter',
  width,
  disabled = false,
  margin = '.7rem 0',
  options = [],
  defaultValue,
  required = true,
}) => {
  //

  const variants: Record<tVariantNames, string> = {
    quarter: '24%',
    half: '48%',
    third: '72%',
    full: '100%',
  };

  return (
    <div
      className='select'
      style={{
        width: width ? width : variants[variant as tVariantNames],
        margin,
      }}
    >
      {label && <label className='select--label'>{label}</label>}
      <select
        name={name}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {defaultValue && (
          <option
            disabled
            value={
              typeof defaultValue === 'string'
                ? defaultValue
                : defaultValue.value
            }
          >
            {typeof defaultValue === 'string'
              ? defaultValue
              : defaultValue.name || defaultValue.value}
          </option>
        )}

        {options?.map((opt, index) => {
          return (
            <option key={index} value={opt?.value}>
              {opt?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
