// import { colors } from '../../assets/constants/colors';

import { colors } from '../constant/colors copy';

export const PlusIcon = ({
  size = 20,
  color = colors.primary[500],
}: {
  size?: number | string;
  color?: string;
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.16699 9.16699V4.16699H10.8337V9.16699H15.8337V10.8337H10.8337V15.8337H9.16699V10.8337H4.16699V9.16699H9.16699Z'
        fill={color}
      />
    </svg>
  );
};
