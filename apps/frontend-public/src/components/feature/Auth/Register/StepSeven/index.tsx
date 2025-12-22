import React from 'react'

const StepSeven: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="situation-matrimonial" className="form-label">
          Régions
        </label>
        <select name="region" id="region" className="form-select">
          <option value="">...</option>
        </select>
      </div>
      <div className="col">
        <label htmlFor="situation-matrimonial" className="form-label">
          Ville
        </label>
        <select name="ville" id="ville" className="form-select">
          <option value="">...</option>
        </select>
      </div>
    </div>
  )
}

export default StepSeven
