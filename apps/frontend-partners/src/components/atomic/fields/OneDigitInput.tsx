import React, { ChangeEvent } from 'react';

interface iOneDigitInput {
  value: string;
  focused: boolean;
  setValue: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const OneDigitInput: React.FC<iOneDigitInput> = ({
  value,
  setValue,
  className,
  style,
}) => {
  return (
    <input
      className={'one-digit-input ' + className}
      style={style}
      type='text'
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setValue((s) => s + e.target.value)
      }
      maxLength={1}
    />
  );
};

export default OneDigitInput;
