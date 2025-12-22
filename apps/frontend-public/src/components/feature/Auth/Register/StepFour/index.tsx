import React from 'react'

const StepFour: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="numero-telephone" className="form-label">
          N° Carte de séjour*
        </label>
        <input
          type="tel"
          id="numero-telephone"
          name="numero-telephone"
          className="form-control"
        />
      </div>
      <div className="col">
        <label htmlFor="date-validite" className="form-label">
          Date de validité : *
        </label>
        <input
          type="date"
          id="date-validite"
          name="date-validite"
          className="form-control"
        />
      </div>
    </div>
  )
}

export default StepFour
