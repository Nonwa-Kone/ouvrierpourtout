import React from 'react'
import { NavLink } from 'react-router-dom'

import Logo from '../../../assets/images/logo.png'

import {
  ContactIcon,
  HomeIcon,
  OrderIcon,
  SearchIcon,
  UserIcon,
} from '../../../assets/svg/Icon'
import './index.css'

const Nav: React.FC = () => {
  React.useEffect(() => {
    const header = document.getElementById('header')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        console.log(window.scrollY)
        header?.classList.add('sticky-top')
      } else {
        header?.classList.remove('sticky-top')
      }
    })
  }, [])
  return (
    <nav
      className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5"
      id="header"
    >
      <div className="container">
        <a href="/" className="navbar-brand d-flex align-items-center">
          <h1 className="m-0">
            <img className="img-fluid me-3" src={Logo} alt="" />
          </h1>
        </a>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {/* avant mx-auto et j'ai modifié à ms-auto line 48 */}
          <div className="navbar-nav ms-auto bg-light rounded pe-4 py-3 py-lg-0">
            <NavLink
              to="/"
              className="nav-item nav-link"
              onClick={() => (window.location.href = '/')}
            >
              <HomeIcon size={18} /> Accueil
            </NavLink>
            <div className="nav-item dropdown">
              <NavLink
                to="/apropos"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                <UserIcon size={18} /> A propos
              </NavLink>
              <div className="dropdown-menu bg-light border-0 m-0">
                <NavLink
                  to={'/apropos/qui-nous-sommes'}
                  className="dropdown-item"
                  onClick={() =>
                    (window.location.href = '/apropos/qui-nous-sommes')
                  }
                >
                  Qui nous sommes
                </NavLink>
                <NavLink
                  to={'/apropos/historique'}
                  className="dropdown-item"
                  onClick={() => (window.location.href = '/apropos/historique')}
                >
                  Historiques
                </NavLink>
                <NavLink
                  to="/apropos/nos-partenaires"
                  className="dropdown-item"
                >
                  Nos partenaires
                </NavLink>
                <NavLink
                  to="/apropos/mot-du-responsable"
                  className="dropdown-item"
                >
                  Mot du responsable
                </NavLink>
              </div>
            </div>
            <NavLink
              to="/retrouver-un-ouvrier"
              className="nav-item nav-link"
              title="Retrouver un ouvrier ici"
            >
              <SearchIcon size={18} /> Retrouver un ouvrier
            </NavLink>
            <NavLink
              to="/besoin-ouvrier"
              className="nav-item nav-link"
              title="Passer vos demande d'ouvrier ici"
            >
              <OrderIcon size={18} /> Passer vos demande d'ouvrier
            </NavLink>

            <NavLink
              to="/contact"
              className="nav-item nav-link"
              onClick={() => (window.location.href = '/contact')}
            >
              <ContactIcon size={18} /> Contactez nous
            </NavLink>
          </div>
        </div>
        {/* <NavLink
          to="/auth/login"
          className="btn btn-primary px-3 d-none d-lg-block"
        >
          S'inscrire
        </NavLink> */}
      </div>
    </nav>
  )
}

export default Nav
