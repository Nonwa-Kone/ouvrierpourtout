import React from 'react'

const StepOne: React.FC = () => {
  return (
    <div className="row">
      <div className="col">
        <label htmlFor="nom" className="form-label">
          Nom
        </label>
        <input type="text" id="nom" name="nom" className="form-control" />
      </div>
      <div className="col">
        <label htmlFor="hors-nom" className="form-label label">
          Prénoms
        </label>
        <input type="text" id="prenom" name="prenom" className="form-control" />
      </div>
    </div>
  )
}

export default StepOne
