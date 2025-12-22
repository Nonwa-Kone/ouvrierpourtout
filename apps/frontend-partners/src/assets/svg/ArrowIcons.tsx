// import { colors } from '../constants/colors';

import { colors } from '../constant/colors copy';

export const ArrowUpIcon = ({
  color = colors.dark[500],
}: {
  color: string;
}) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 20V4M12 4L6 10M12 4L18 10'
        stroke={color}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export const ArrowDownIcon = ({
  color = colors.dark[500],
}: {
  color: string;
}) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 4V20M12 20L18 14M12 20L6 14'
        stroke={color}
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};
