import React from 'react';

export const LogoutIcon: React.FC = ({
  size = '24',
  color = '#EF9A9A',
  onClick,
}: {
  size?: string;
  color?: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
      onClick={onClick}
      // class='lucide lucide-log-out'
    >
      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <polyline points='16 17 21 12 16 7' />
      <line x1='21' x2='9' y1='12' y2='12' />
    </svg>
  );
};
