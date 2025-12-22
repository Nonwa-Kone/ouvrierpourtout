import styled from 'styled-components';
import { colors } from '../../../assets/constant/colors';

interface InputProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
}

export type tInput = {
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  size?: InputProps['size'];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  width?: 'half' | 'full' | 'third';
  label?: string;
  Icon?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement>;
};

const ContainerInput = styled.div<{ size?: InputProps['size'] }>`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${colors.gray['300']};
  color: ${colors.dark['900']};
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease-in-out;

  ${(props) => {
    if (props.size === 'medium') {
      return `
        padding: 0.5rem 0.8rem;
        font-size: 18px;
      `;
    }
    if (props.size === 'large') {
      return `
        padding: 1remx;
        font-size: 20px;
      `;
    }
    return `
      padding: 0.4rem;
      font-size: 16px;
    `;
  }}
`;

const InputStyled = styled.input`
  width: 100%;
  border: 0;
  color: ${colors.dark['900']};
  font-size: 14px;
  font-weight: 700;
  font-family: 'Inter Light';
  outline: none;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: ${colors.dark['900']};
    /* font-size: 11px !important; */
  }
`;

function Input({
  id,
  name,
  placeholder,
  type,
  value,
  onChange,
  size,
  Icon,
  width = 'half',
  label,
  ref,
}: tInput) {
  const widthSize =
    width === 'half'
      ? '50%'
      : width === 'full'
      ? '100%'
      : width === 'third'
      ? '31%'
      : '';

  return (
    // TODO: add type
    <div style={{ width: widthSize }}>
      {label && (
        <label
          htmlFor={id}
          className='input-label'
          style={{
            fontSize: '0.75rem',
            color: colors.gray['700'],
            marginBottom: '1rem',
          }}
        >
          {label}
        </label>
      )}
      <ContainerInput size={size}>
        {Icon && <span>{Icon}</span>}
        <InputStyled
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </ContainerInput>
    </div>
  );
}

export default Input;
