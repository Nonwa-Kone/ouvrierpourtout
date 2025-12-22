// import { colors } from '../../../assets/constant/colors';

// export type tSelect = {
//   id?: string;
//   name?: string;
//   value?: string;
//   options: Array<{ name: string; value: string }>;
//   placeholder?: string;
//   label?: string;
//   Icon?: React.ReactNode;
//   width?: 'half' | 'full' | 'third';
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
// };

// function Select({
//   id,
//   name,
//   value,
//   options = [],
//   placeholder,
//   label,
//   Icon,
//   onChange,
//   width = 'half',
// }: tSelect) {
//   return (
//     <div
//       style={{
//         width:
//           width === 'half'
//             ? '49%'
//             : width === 'full'
//             ? '100%'
//             : width === 'third'
//             ? '32%'
//             : '0%',
//       }}
//     >
//       {label && (
//         <label
//           htmlFor={id}
//           className='input-label'
//           style={{
//             fontSize: '0.75rem',
//             color: colors.gray['700'],
//             marginBottom: '1rem',
//           }}
//         >
//           {label}
//         </label>
//       )}
//       <div
//         className='select-container'
//         style={{
//           border: `1px solid ${colors.gray['300']}`,
//           width: '100%',
//         }}
//       >
//         {Icon ? <span>{Icon}</span> : null}
//         <select
//           className='input-select'
//           name={name}
//           id={id}
//           value={value}
//           onChange={onChange}
//           style={{ width: '100%' }}
//         >
//           {placeholder && <option value=''>{placeholder}</option>}
//           {options.map((option) => (
//             <option
//               className='input-select-option'
//               key={option.value}
//               value={option.value}
//             >
//               {option.name}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

// export default Select;

import React from 'react';

export type tVariantNames = 'quarter' | 'half' | 'third' | 'full';

interface tFields {
  label?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  margin?: string;
  width?: string | number;
}

interface tSelect {
  defaultValue?: {
    name?: string;
    value?: string | number;
  };
  value: string | number;
  options: Array<{
    name: string;
    value: string | number;
  }>;
  variant?: 'half' | 'full';
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface iSelectExtend extends tFields, tSelect {}

export const Select: React.FC<iSelectExtend> = ({
  label,
  name,
  onChange,
  variant = 'quarter',
  width,
  disabled = false,
  margin = '.7rem 0',
  options = [],
  defaultValue,
  value,
  required = true,
}) => {
  //

  const variants: Record<tVariantNames, string> = {
    quarter: '24%',
    half: '48%',
    third: '72%',
    full: '100%',
  };

  return (
    <div
      className='select'
      style={{
        width: width ? width : variants[variant as tVariantNames],
        margin,
      }}
    >
      {label && <label className='select--label'>{label}</label>}
      <select
        name={name}
        onChange={onChange}
        disabled={disabled}
        required={required}
        value={value}
      >
        {!!defaultValue && (
          <option disabled hidden selected value={defaultValue?.value}>
            {defaultValue?.name}
          </option>
        )}

        {options?.map((opt, index) => {
          return (
            <option key={index} value={opt?.value}>
              {opt?.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
