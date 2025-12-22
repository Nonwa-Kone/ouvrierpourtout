import React from 'react'

import './index.css'

interface IPropsCard {
  children: React.ReactNode
}

const Card: React.FC<IPropsCard> = ({ children }) => {
  return <div className="card feature mb-5">{children}</div>
}

export default Card
