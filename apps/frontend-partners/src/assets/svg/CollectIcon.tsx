export const CollectIcon = ({ color = '#22C55E', size = 80 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 80 80'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='80' height='80' rx='8' fill='#E9FBF0' />
      <g clip-path='url(#clip0_27_8)'>
        <path
          d='M39.2842 28.4992V52.0694M39.2842 52.0694L51.0693 40.2843M39.2842 52.0694L27.4991 40.2843'
          stroke='#22C55E'
          stroke-width='4'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_27_8'>
          <rect
            width='40'
            height='40'
            fill='white'
            transform='translate(67.5686 40.2843) rotate(135)'
          />
        </clipPath>
      </defs>
    </svg>
  );
};
