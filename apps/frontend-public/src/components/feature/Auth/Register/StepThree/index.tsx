import React from 'react'

const StepThree: React.FC = () => {
  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="date-naissance" className="form-label">
            Date de naissance
          </label>
          <input
            type="date"
            id="date-naissance"
            name="date-naissance"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="lieu-naissance" className="form-label">
            Lieu de naissance
          </label>
          <input
            type="text"
            id="lieu-naissance"
            name="lieu-naissance"
            className="form-control"
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="nationalite" className="form-label">
            Nationalité
          </label>
          <input
            type="text"
            id="nationalite"
            name="nationalite"
            className="form-control"
          />
        </div>
        <div className="col">
          <label htmlFor="passport" className="form-label label">
            N° CNI ou PASSPORT : *
          </label>
          <input
            type="text"
            id="passport"
            name="passport"
            className="form-control"
          />
        </div>
      </div>
    </>
  )
}

export default StepThree
