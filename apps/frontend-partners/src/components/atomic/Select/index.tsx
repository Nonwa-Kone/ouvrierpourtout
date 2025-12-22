import React from 'react';
import { colors } from '../../../assets/constant/colors';

export type tSelect = {
  id?: string;
  name?: string;
  value?: string;
  options: Array<{ name: string; value: string }>;
  placeholder?: string;
  label?: string;
  Icon?: React.ReactNode;
  width?: 'half' | 'full' | 'third';
  onChange?: (
    event: React.ChangeEventHandler<HTMLInputElement> | string | undefined
  ) => void | undefined;
  defaultValue?: string | null;
};

function Select({
  id,
  name,
  value,
  options = [],
  placeholder,
  label,
  Icon,
  onChange,
  width = 'half',
  defaultValue,
}: tSelect) {
  return (
    <div
      style={{
        width:
          width === 'half'
            ? '49%'
            : width === 'full'
            ? '100%'
            : width === 'third'
            ? '32%'
            : '0%',
      }}
    >
      {label && (
        <label
          htmlFor={id}
          className='input-label'
          style={{
            fontSize: '0.75rem',
            color: colors.gray['700'],
            marginBottom: '1rem',
          }}
        >
          {label}
        </label>
      )}
      <div
        className='select-container'
        style={{
          border: `1px solid ${colors.gray['300']}`,
          width: '100%',
        }}
      >
        {Icon ? <span>{Icon}</span> : null}
        <select
          className='input-select'
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          style={{ width: '100%' }}
          defaultValue={defaultValue as string}
        >
          {placeholder && <option value=''>{placeholder}</option>}
          {options.map((option) => (
            <option
              className='input-select-option'
              key={option.value}
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
