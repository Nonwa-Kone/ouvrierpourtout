import React from 'react'

const StepTwo: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="numero-telephone" className="form-label">
          Numéro de téléphone
        </label>
        <input
          type="tel"
          id="numero-telephone"
          name="numero-telephone"
          className="form-control"
        />
      </div>
      <div className="col">
        <label htmlFor="email" className="form-label label">
          E-mail
        </label>
        <input type="email" id="email" name="email" className="form-control" />
      </div>
    </div>
  )
}

export default StepTwo
