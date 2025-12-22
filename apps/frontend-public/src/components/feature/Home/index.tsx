import React from 'react'
import Carousel from '../../shared/Carrousel'

import '../../shared/Card/index.css'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { specialiteSection } from '../../../assets/constant/specialiteSection'

import { Descriptif } from '../../layouts/Home/Descriptif'
import './index.css'

import OfferOneImg from '../../../assets/images/corporate.jpg'
import OfferTwoImg from '../../../assets/images/main-affaire.jpg'

const Home: React.FC = () => {
  return (
    <>
      <Carousel />
      {/* QUELQUES CORP DE METIER */}
      <div className="container-fluid specialite-section">
        <div className="container">
          <div className="row mb-5">
            <h2 className="text-start">
              Quelque corps de spécialités de nos ouvriers
            </h2>
          </div>
          <div className="row">
            {specialiteSection.map((section) => (
              <div className="col-lg-3 col-md-3 col-sm-12 mb-4 mb-lg-0">
                <div className="card">
                  <img
                    src={section.picture}
                    className="img-fluid"
                    alt=""
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h3>{section.title}</h3>
                    {/* <p>Tout type de travaux concernant la maçonnerie</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid offer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 text-end">
                      <img src={OfferOneImg} alt="" className="img-fluid" />
                    </div>
                    <div className="col-md-6">
                      <h3>Objectifs</h3>
                      <p className="text-justify">
                        Offrir des services de bricolage, de réparation et
                        d'entretien à domicile dans une zone géographique
                        définie.
                      </p>
                      <p className="text-justify">
                        Assurer la satisfaction client par la qualité du service
                        et la rapidité d'intervention.
                      </p>
                      {/* <button className="btn btn-primary">
                        En savoir plus
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 text-end">
                      <img
                        src={OfferTwoImg}
                        alt=""
                        className="img-fluid"
                        loading="lazy"
                      />
                    </div>
                    <div className="col-md-6">
                      <h3>Maçonnerie</h3>
                      <p>Tout type de travaux concernant la maçonnerie</p>
                      <button className="btn btn-primary">
                        En savoir plus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Temoinage */}
      <div className="container-fluid temoinage">
        <div className="container">
          <div className="row mb-5">
            <h2 className="text-start">Temoinage</h2>
          </div>
          <div className="row">
            {/* <h1>Temoinage</h1> */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={3}
              autoplay
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              onSlideChange={() => console.log('slide change')}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/5691626/pexels-photo-5691626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                  className="img-fluid"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/8961338/pexels-photo-8961338.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                  className="img-fluid"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/8961526/pexels-photo-8961526.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                  className="img-fluid"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://images.pexels.com/photos/5974054/pexels-photo-5974054.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  alt=""
                  className="img-fluid"
                />
              </SwiperSlide>
              ...
            </Swiper>
          </div>
        </div>
      </div>
      <Descriptif />

      {/* < */}
    </>
  )
}

export default Home
