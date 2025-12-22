import React from 'react'

const StepEigth: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="numero-villa" className="form-label">
          N° Villa
        </label>
        <input
          type="text"
          name="numero-villa"
          id="numero-villa"
          className="form-control"
        />
      </div>
      <div className="col">
        <label htmlFor="quartier" className="form-label">
          Quartier
        </label>
        <input
          type="text"
          name="quartier"
          id="quartier"
          className="form-control"
        />
      </div>
      <div className="col">
        <label htmlFor="cite" className="form-label">
          Cité
        </label>
        <input type="text" name="cite" id="cite" className="form-control" />
      </div>
    </div>
  )
}

export default StepEigth
