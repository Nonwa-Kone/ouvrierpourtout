import React from 'react'

import { Link } from 'react-router-dom'
import ImgConnexion from '../../../../assets/images/metier-img/menuisierie.jpg'

const Login: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <img
            src={ImgConnexion}
            className="img-fluid w-100"
            alt="images de connexion"
          />
        </div>
        <div className="col-lg-6">
          <div className="border p-5">
            <h4 className="display-6 text-center fw-bold mb-3">
              Espace de connexion
            </h4>
            <p className="lead text-center mb-3">
              Cet espace est reservé aux ouvriers qui ont créee leurs compte sur
              notre plateforme
            </p>
            <form action="" method="post">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="username">
                  Nom d'utilisateur
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="username">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <Link className="mb-3" to={'/auth/register'}>
                Je m'inscris en tant que ouvrier
              </Link>
              <br />
              <button className="btn btn-primary" type="submit">
                Connexion
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
