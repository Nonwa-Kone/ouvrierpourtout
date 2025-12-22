export const StatsIcon = ({
  color = '#5879DA',
  size = '80',
}: {
  color?: string;
  size?: string;
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
      // class='lucide lucide-chart-no-axes-combined'
    >
      {/* <rect x='3' y='3' width='120' height='120' rx='20' fill='#F5F5F5' /> */}
      <path d='M12 16v5' />
      <path d='M16 14v7' />
      <path d='M20 10v11' />
      <path d='m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15' />
      <path d='M4 18v3' />
      <path d='M8 14v7' />
    </svg>
  );
};
