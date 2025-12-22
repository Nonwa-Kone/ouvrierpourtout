import { LucideIcon } from 'lucide-react';
import React, { MouseEventHandler } from 'react';
import { colors } from '../../../assets/constant/colors copy';
// import { tButton } from '../../../types/buttons';

export type tButton = {
  hidden?: boolean | undefined;
  label?: string | React.ReactNode;
  id?: string | undefined;
  onClick?: void | MouseEventHandler<HTMLButtonElement> | undefined;
  disabled?: boolean | undefined;
  variant?: string | number | undefined;
  margin?: string | number | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  Icon?:
    | React.FC<{
        color?: string;
        size?: number;
        width?: number | string;
        height?: number | string;
      }>
    | LucideIcon;
  modeStyles?: {
    color: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
  };
  reverse?: boolean;
};

export const Button: React.FC<tButton> = ({
  label,
  onClick = () => {},
  variant = 'primary',
  disabled,
  width = 'auto',
  height,
  margin = '.5rem',
  Icon,
  modeStyles,
  reverse,
  id,
}) => {
  const variantValue: {
    [key: string]: {
      color: string;
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      borderRadius: number;
    };
  } = {
    primary: {
      color: modeStyles?.color || colors.light[50],
      backgroundColor: modeStyles?.backgroundColor || colors.primary[800],
      borderColor: modeStyles?.borderColor || colors.primary[800],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    secondary: {
      color: modeStyles?.color || colors.primary[500],
      backgroundColor: modeStyles?.backgroundColor || colors.light[50],
      borderColor: modeStyles?.borderColor || colors.primary[500],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    danger: {
      color: modeStyles?.color || colors.light[50],
      backgroundColor: modeStyles?.backgroundColor || colors.danger[500],
      borderColor: modeStyles?.borderColor || colors.danger[500],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    warning: {
      color: modeStyles?.color || colors.dark[800],
      backgroundColor: modeStyles?.backgroundColor || colors.warning[500],
      borderColor: modeStyles?.borderColor || colors.warning[500],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    success: {
      color: modeStyles?.color || colors.light[50],
      backgroundColor: modeStyles?.backgroundColor || colors.success[500],
      borderColor: modeStyles?.borderColor || colors.success[500],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    'border-btn': {
      color: modeStyles?.color || colors.dark[300],
      backgroundColor: modeStyles?.backgroundColor || 'transparent',
      borderColor: modeStyles?.borderColor || colors.dark[300],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    gray: {
      color: modeStyles?.color || colors.dark[800],
      backgroundColor: modeStyles?.backgroundColor || colors.dark[300],
      borderColor: modeStyles?.borderColor || colors.dark[300],
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
    neutral: {
      color: modeStyles?.color || colors.dark[800],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderRadius: modeStyles?.borderRadius || 8,
      borderWidth: modeStyles?.borderWidth || 0,
    },
  };
  const { color, ...variantStyles } = variantValue[variant];
  return (
    <button
      id={id}
      style={{
        ...variantStyles,
        flexDirection: reverse ? 'row-reverse' : 'row',
        margin,
        width,
        height,
        padding: '0.3rem 0.8rem',
      }}
      disabled={disabled}
      onClick={onClick}
      className='button'
    >
      {Icon && <Icon color={color} size={18} />}
      {label && <span style={{ color, fontSize: 12 }}>{label}</span>}
    </button>
  );
};
