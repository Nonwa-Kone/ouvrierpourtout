import React, { ChangeEvent, KeyboardEvent } from 'react';

interface iOneDigitInput {
  value: string;
  focused: boolean;
  setValue: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const OneDigitInput: React.FC<iOneDigitInput> = ({
  value,
  focused,
  setValue,
  className = '',
  style,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digit = e.target.value.replace(/[^0-9]/g, '');
    if (digit) {
      setValue(digit);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      setValue('');
    }
  };

  return (
    <input
      className={`one-digit-input ${className}`}
      style={style}
      type='text'
      inputMode='numeric'
      pattern='[0-9]*'
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={1}
      autoFocus={focused}
      aria-label='Single digit input'
    />
  );
};

export default OneDigitInput;
