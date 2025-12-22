import styled from 'styled-components';

const BadgeTag = styled.div<{
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return '#fa0274';
      case 'secondary':
        return '#00b894';
      case 'tertiary':
        return '#0052cc';
      default:
        return '#fa0274';
    }
  }};
  font-size: ${({ size }) => (size === 'small' ? '0.775rem' : '1rem')};
  font-family: 'Inter Medium';
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  Icon?: React.ReactNode;
  onClick?: () => void;
  label?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'medium',
  Icon,
  label,
  onClick,
}) => {
  return (
    <BadgeTag variant={variant} size={size} onClick={onClick}>
      {Icon && Icon} <span>{label}</span>
    </BadgeTag>
  );
};
