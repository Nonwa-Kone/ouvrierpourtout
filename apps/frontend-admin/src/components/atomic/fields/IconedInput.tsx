import React, { ChangeEvent, ReactNode } from 'react';

interface iIconedInpuite {
  placeholder?: string;
  icon?: ReactNode;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  classNameInput?: string;
  styleInput?: React.CSSProperties;
  type?: string;
  name?: string;
  defaultValue?: string;
}

export const IconedInput: React.FC<iIconedInpuite> = ({
  placeholder,
  icon,
  onChange,
  onKeyPress,
  value,
  className,
  style,
  classNameInput,
  styleInput,
  type = 'text',
  name,
  defaultValue,
}) => {
  return (
    <>
      <div className={'iconed-input ' + className} style={style}>
        {icon}
        <input
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={value}
          name={name}
          className={'iconed-input-input ' + classNameInput}
          style={styleInput}
          type={type}
          pattern='/^[a-zA-Z0-9 ]*$/'
          title='Autorise seulement lettres, chiffres et espaces'
        />
      </div>
    </>
  );
};
