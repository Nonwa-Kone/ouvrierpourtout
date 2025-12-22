import styled from 'styled-components';
import { colors } from '../../../assets/constant/colors copy';
// import { colors } from '../../../assets/constant/colors';
// export type ButtonProps['variant'] = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type tType = 'submit' | 'reset' | 'button';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}

export type tButton = {
  className?: string;
  id?: string;
  name?: string;
  type?: tType;
  value?: string;
  variant?: ButtonProps['variant'];
  label?: string;
  Icon?: React.ReactNode;
  children?: React.ReactNode;
  size?: ButtonProps['size'];
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

const ButtonStyled = styled.button<{
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
}>`
  @extend %flex-center;
  @extend %flex-row;
  padding: 0 20px;
  border-radius: 8px;
  font-family: 'Roboto Bold';
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 0;

  ${(props) => {
    if (props.variant === 'primary') {
      return `
        background-color: ${colors.primary[500]};
        color: ${colors.dark[50]};
      `;
    }
    if (props.variant === 'secondary') {
      return `
        background-color: ${colors.success['500']};
        color: ${colors.success['100']};
      `;
    }
    if (props.variant === 'danger') {
      return `
        background-color: ${colors.danger['900']};
        color: ${colors.danger['100']};
      `;
    }
    return `
      background-color: ${colors.light['100']};
      color: ${colors.light['900']};
    `;
  }}

  ${(props) => {
    if (props.size === 'medium') {
      return `
        padding: 10px 40px;
        font-size: 18px;
      `;
    }
    if (props.size === 'large') {
      return `
        padding: 15px 40px;
        font-size: 20px;
      `;
    }
    return `
      padding: 5px 20px;
      font-size: 16px;
    `;
  }}
`;

function Button({
  id,
  name,
  type,
  variant,
  onClick,
  label,
  className,
  Icon,
  size,
  disabled,
  style,
}: tButton) {
  return (
    <ButtonStyled
      disabled={disabled}
      type={type}
      id={id}
      className={className}
      name={name}
      variant={variant}
      size={size}
      onClick={onClick}
      style={style}
    >
      {Icon} <span>{label}</span>
    </ButtonStyled>
  );
}

export default Button;
