import React from 'react'

import ImgCarousel2 from '../../../assets/images/img-ouvrier/carouse-02.jpg'
import ImgCarousel3 from '../../../assets/images/img-ouvrier/carouse-04.jpg'
import ImgCarousel4 from '../../../assets/images/img-ouvrier/carouse-05.jpg'
import ImgCarousel1 from '../../../assets/images/img-ouvrier/carousel-01.jpg'

import './index.css'

// import '../../../assets/scripts/main.js'

const Carousel: React.FC = () => {
  return (
    <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
      <div
        id="header-carousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="w-100"
              src={ImgCarousel1}
              alt="carousel images"
              loading="lazy"
            />
            <div className="carousel-caption">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    {/* <h1 className="display-4 fw-bold text-dark mb-4 text-start animated slideInDown">
                      Notre plateforme vous facilite la demande d'ouvrier en
                      quelque clique
                    </h1> */}
                    {/* <p className="fs-5 text-body text-start mb-5">
                      Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                      duo justo magna dolore erat amet
                    </p> */}
                    {/* <a
                      href="#"
                      className="btn btn-primary text-start py-3 px-5"
                    >
                      More Details
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={ImgCarousel2}
              alt="carousel images"
              loading="lazy"
            />
            <div className="carousel-caption">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    {/* <h1 className="display-4 fw-bold text-dark mb-4 animated slideInDown">
                      Rentre en contact avec un ouvrier dans 10 min
                    </h1> */}
                    {/* <p className="fs-5 text-body mb-5">
                      Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                      duo justo magna dolore erat amet
                    </p> */}
                    {/* <a href="#" className="btn btn-primary py-3 px-5">
                      More Details
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={ImgCarousel3}
              alt="carousel images"
              loading="lazy"
            />
            <div className="carousel-caption">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    {/* <h1 className="display-4 fw-bold text-dark mb-4 animated slideInDown">
                      Je suis ouvrier professionnelle, Je postule pour faire
                      partie de l'aventure
                    </h1> */}
                    {/* <p className="fs-5 text-body mb-5">
                      Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                      duo justo magna dolore erat amet
                    </p> */}
                    {/* <a href="#" className="btn btn-primary py-3 px-5">
                      More Details
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="w-100"
              src={ImgCarousel4}
              alt="carousel images"
              loading="lazy"
            />
            <div className="carousel-caption">
              <div className="container">
                <div className="row">
                  <div className="col-12 col-lg-8">
                    {/* <h1 className="display-4 fw-bold text-dark mb-4 animated slideInDown">
                      Vous êtes un entreprise adherer à notre plateforme
                    </h1> */}
                    {/* <p className="fs-5 text-body mb-5">
                      Clita erat ipsum et lorem et sit, sed stet lorem sit clita
                      duo justo magna dolore erat amet
                    </p>
                    <a href="#" className="btn btn-primary py-3 px-5">
                      More Details
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#header-carousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Carousel
