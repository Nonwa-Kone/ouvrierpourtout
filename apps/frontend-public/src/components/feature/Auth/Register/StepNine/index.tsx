import React from 'react'

const StepNine: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="competence" className="form-label">
          Domaine de compétence :
        </label>
        <input
          type="text"
          name="competence"
          id="competence"
          className="form-control"
        />
      </div>
      <div className="col">
        <label htmlFor="experience" className="form-label">
          Année d’expérience :
        </label>
        <input
          type="text"
          name="experience"
          id="experience"
          className="form-control"
        />
      </div>
      <div className="col">
        <label htmlFor="qualification" className="form-label">
          Spécialité et qualification
        </label>
        <input
          type="text"
          name="qualification"
          id="qualification"
          className="form-control"
        />
      </div>
    </div>
  )
}

export default StepNine
