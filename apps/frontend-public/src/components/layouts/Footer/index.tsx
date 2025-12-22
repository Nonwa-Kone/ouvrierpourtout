import React from 'react'
import Logo from '../../../assets/images/logo.png'

import { FaLongArrowAltRight } from 'react-icons/fa'

import './index.css'

export const Footer: React.FC = () => {
  return (
    <div className="container-fluid footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4">
            <img
              src={Logo}
              alt="Logo"
              className="img-fluid"
              loading="lazy"
              width={100}
              height={100}
            />
            <h3 className="my-lg-3">Informations</h3>
            <p>
              Côte d'Ivoire, Abidjan, Yopougon Kouté non loin du terminus de bus
              40
            </p>
            <p>+225 0748214936</p>
            <p>contact@example.com</p>
            <h3 className="my-lg-3 display-6">Suivez nous</h3>
            <div
              className="social-icons d-flex justify-content-start mb-4 me-4"
              style={{ gap: '1rem', display: 'flex' }}
            >
              <a
                href="https://www.facebook.com/example"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/example"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.twitter.com/example"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com/example"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.youtube.com/example"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <h3 className="">Nos services</h3>
            <div className="nav-menu">
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  Plombérie
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  Electricité
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  Bricolage
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  Néttoyage
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  Jardinier
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <h3>Liens utiles</h3>
            <div className="nav-menu">
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Accueil
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Demander un ouvrier
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Retrouver un ouvrier
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Contactez-nous
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> FAQ
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> CGV
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Blog
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Politique de confidentialité
                </a>
              </div>
              <div className="nav-item">
                <a className="nav-link text-white" href="/">
                  <FaLongArrowAltRight /> Protection des données
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3"></div>
        </div>
      </div>
    </div>
  )
}
