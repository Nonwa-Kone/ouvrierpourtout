import React from 'react'

interface IBesoinOuvrier {
  // title: string
  // children: React.ReactNode
}

const BesoinOuvriers: React.FC<IBesoinOuvrier> = ({}) => {
  return (
    <form action="" method="post">
      <div className="row">
        <div className="col-lg-4">
          <label className="form-label" htmlFor="situation-geographie">
            Situation Géographique
          </label>
          <select
            name="situation-geographie"
            id="situation-geographie"
            className="form-select"
          >
            <option value="">...</option>
          </select>
        </div>
        <div className="col-lg-4">
          <label className="form-label" htmlFor="quartier">
            Quartier
          </label>
          <input
            type="text"
            name="quartier"
            id="quartier"
            className="form-control"
          />
        </div>
        <div className="col-lg-4">
          <div className="row h-100 align-items-end">
            <button className="btn btn-primary align-self-end">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default BesoinOuvriers
