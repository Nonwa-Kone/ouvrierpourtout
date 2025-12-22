import React from 'react'

interface IProps {
  children: React.ReactNode
}

const Form: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>
}

export default Form
