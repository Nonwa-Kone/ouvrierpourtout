import React from 'react';
import { colors } from '../../../assets/constant/colors';
// import { colors } from '../../../assets/constants/colors';

export const Switch: React.FC<{
  handleChange: (checked: boolean) => void;
  checked: boolean;
  variant?: 'xs' | 'sm' | 'md' | 'lg';
}> = ({ handleChange, checked, variant = 'md' }) => {
  const variants = {
    switchBg: {
      xs: {
        width: 35,
        height: 15,
      },
      sm: {
        width: 40,
        height: 20,
      },
      md: {
        width: 45,
        height: 25,
      },
      lg: {
        width: 50,
        height: 30,
      },
    },
    switchBtn: {
      xs: {
        width: 17,
        height: 17,
        borderRadius: 17,
      },
      sm: {
        width: 20,
        height: 20,
        borderRadius: 20,
      },
      md: {
        width: 23,
        height: 23,
        borderRadius: 23,
      },
      lg: {
        width: 26,
        height: 26,
        borderRadius: 26,
      },
    },
  };
  return (
    <div
      className='switch'
      style={{
        backgroundColor: checked ? colors.purple[500] : colors.dark[500],
        ...variants.switchBg[variant],
      }}
    >
      <button
        onClick={() => handleChange(!checked)}
        className='switch--btn'
        style={{
          left: checked ? 'inherit' : 2,
          right: checked ? 2 : 'inherit',
          ...variants.switchBtn[variant],
        }}
      />
    </div>
  );
};
