import React from 'react'

const StepFive: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="situation-matrimonial" className="form-label">
          Stituation matrimoniale
        </label>
        <select
          name="situation-matrimonial"
          id="situation-matrimonial"
          className="form-select"
        >
          <option value="Célibataire">Célibataire</option>
          <option value="Marié">Marié</option>
          <option value="Vie maritale">Vie maritale</option>
        </select>
      </div>
      <div className="col">
        <label htmlFor="enfant-en-charge" className="form-label">
          Enfants à charge: *
        </label>
        <input
          type="text"
          id="enfant-en-charge"
          name="enfant-en-charge"
          className="form-control"
        />
      </div>
    </div>
  )
}

export default StepFive
