import { MouseEventHandler } from 'react';

export type tField = {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type tCheckboxBtn = {
  active: boolean;
  label?: string | undefined;
  onCheck: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit' | undefined;
};

export type tButton = {
  label?: string;
  id?: string | undefined;
  onClick?: void | MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  variant?: string | number | undefined;
  margin?: string | number | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  Icon?: React.FC<{ color?: string; size?: number }>;
  modeStyles?: {
    color: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
  };
  reverse?: boolean;
};
