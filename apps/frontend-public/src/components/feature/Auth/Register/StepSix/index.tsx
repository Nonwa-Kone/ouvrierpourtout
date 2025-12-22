import React from 'react'

const StepSix: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="situation-matrimonial" className="form-label">
          N° de sécurité sociale ou CMU
        </label>
        <input type="text" name="cmu" id="cmu" className="form-control" />
      </div>
    </div>
  )
}

export default StepSix
