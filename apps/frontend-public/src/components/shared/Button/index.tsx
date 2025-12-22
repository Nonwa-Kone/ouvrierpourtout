import React from 'react'

import './index.css'

interface IProps {
  variant?: string | null
  title?: string | null
  icon?: React.ReactNode
  onClick?: () => void | null
  size?: string | null
  disabled?: boolean | null
  className?: string | null
  style?: React.CSSProperties
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<IProps> = ({
  variant = '',
  title = 'button',
  icon,
  onClick,
  size,
  disabled = false,
  className,
  style,
  type,
}) => {
  return (
    <button
      disabled={disabled as boolean}
      type={type}
      className={`btn ${variant} ${size} ${className}`}
      style={style}
      onClick={onClick}
    >
      {icon} {title}
    </button>
  )
}

export default Button
