import React from 'react';
import { tFields, tSelect, tVariantNames } from '../../../types/fields';

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
      style={{ width: width ? width : variants[variant], margin }}
    >
      {label && <label className='select--label'>{label}</label>}
      <select
        name={name}
        onChange={onChange}
        disabled={disabled}
        required={required}
      >
        {!!defaultValue && (
          <option disabled hidden selected value={defaultValue?.value}>
            {defaultValue?.name || defaultValue}
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
