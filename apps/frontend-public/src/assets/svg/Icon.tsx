type tIcon = {
  size?: number | null
  viewBox?: string | null
  fill?: string | null
  xmlns?: string | null
  stroke?: string | null
  strokeWidth?: string | null
  strokeLinecap?: string | null
  strokeLinejoin?: string | null
}

const SaveIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 3V6.4C7 6.96005 7 7.24008 7.10899 7.45399C7.20487 7.64215 7.35785 7.79513 7.54601 7.89101C7.75992 8 8.03995 8 8.6 8H15.4C15.9601 8 16.2401 8 16.454 7.89101C16.6422 7.79513 16.7951 7.64215 16.891 7.45399C17 7.24008 17 6.96005 17 6.4V4M17 21V14.6C17 14.0399 17 13.7599 16.891 13.546C16.7951 13.3578 16.6422 13.2049 16.454 13.109C16.2401 13 15.9601 13 15.4 13H8.6C8.03995 13 7.75992 13 7.54601 13.109C7.35785 13.2049 7.20487 13.3578 7.10899 13.546C7 13.7599 7 14.0399 7 14.6V21M21 9.32548V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H14.6745C15.1637 3 15.4083 3 15.6385 3.05526C15.8425 3.10425 16.0376 3.18506 16.2166 3.29472C16.4184 3.4184 16.5914 3.59135 16.9373 3.93726L20.0627 7.06274C20.4086 7.40865 20.5816 7.5816 20.7053 7.78343C20.8149 7.96237 20.8957 8.15746 20.9447 8.36154C21 8.59171 21 8.8363 21 9.32548Z"
        stroke={props.stroke || 'black'}
        stroke-width={props.strokeWidth || '2'}
        stroke-linecap={props.strokeLinecap || 'round'}
        stroke-linejoin={props.strokeLinejoin || 'round'}
      />
    </svg>
  )
}

const CloseIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        stroke={props.stroke || 'black'}
        stroke-width={props.strokeWidth || '2'}
        stroke-linecap={props.strokeLinecap || 'round'}
        stroke-linejoin={props.strokeLinejoin || 'round'}
      />
    </svg>
  )
}

const HomeIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 21V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V21M11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764Z"
        stroke={props.stroke || 'black'}
        stroke-width={props.strokeWidth || '2'}
        stroke-linecap={props.strokeLinecap || 'round'}
        stroke-linejoin={props.strokeLinejoin || 'round'}
      />
    </svg>
  )
}

const UserIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const ContactIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
        stroke={props.stroke || 'black'}
        stroke-width={props.strokeWidth || '2'}
        stroke-linecap={props.strokeLinecap || 'round'}
        stroke-linejoin={props.strokeLinejoin || 'round'}
      />
    </svg>
  )
}

const SearchIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12C20 16.4183 16.4183 20 12 20M20 12C20 7.58172 16.4183 4 12 4M20 12H22M12 20C7.58172 20 4 16.4183 4 12M12 20V22M4 12C4 7.58172 7.58172 4 12 4M4 12H2M12 4V2M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
        stroke={props.stroke || 'black'}
        stroke-width={props.strokeWidth || '2'}
        stroke-linecap={props.strokeLinecap || 'round'}
        stroke-linejoin={props.strokeLinejoin || 'round'}
      />
    </svg>
  )
}

const OrderIcon = ({ size = 24, ...props }: tIcon) => {
  return (
    <svg
      width={size as number}
      height={size as number}
      viewBox="0 0 24 24"
      fill={props.fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 8V5L19 2L20 4L22 5L19 8H16ZM16 8L12 11.9999M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export {
  CloseIcon,
  ContactIcon,
  HomeIcon,
  OrderIcon,
  SaveIcon,
  SearchIcon,
  UserIcon,
}
