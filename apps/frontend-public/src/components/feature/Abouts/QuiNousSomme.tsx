import './index.css'

import ImgAbout from '../../../assets/images/about.jpg'
import ImgAutre from '../../../assets/images/service/autre.jpg'
import ImgBricolage from '../../../assets/images/service/bicolage.jpg'
import ImgEntretien from '../../../assets/images/service/entretien.webp'
import ImgJardinage from '../../../assets/images/service/jardinage.jpg'
import ImgPlomberie from '../../../assets/images/service/plomberie.jpg'

const QuiNousSomme = () => {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row about">
          <div className="col-lg-8 d-flex justify-content-center align-items-center">
            <p className="text">
              Nous sommes une entreprise spécialisée dans la fourniture de
              services à domicile, allant du ménage à des travaux plus
              techniques comme la plomberie et l'électricité. Ce plan
              opérationnel décrit les étapes clés et les processus qui guident
              le fonctionnement quotidien de l'entreprise afin d'assurer une
              efficacité maximale et une satisfaction client élevée.
            </p>
          </div>
          <div className="col-lg-4">
            <img
              src={ImgAbout}
              className="img-fluid image"
              loading="lazy"
              alt="photos d'une femme pour accompagnement le texte about"
            />
          </div>
        </div>
        {/* <div className="row objective">
          <h2 className="display-5 fw-bold gap-2 mb-5">Objectif</h2>
          <div className="col-lg-12 d-flex justify-content-center align-items-center">
            <p className="lead">
              Notre objectif est de fournir des services de qualité à nos
              clients, en leur offrant une gamme de services à domicile
              personnalisés, adaptés à leurs besoins et à leur budget. Nous
              travaillons avec des professionnels qualifiés et expérimentés qui
              sont formés pour répondre aux besoins de nos clients de manière
              efficace et professionnelle.
            </p>
          </div>
        </div> */}
        <div className="row service">
          <h2 className="display-5 fw-bold gap-2 mb-5">Services Offerts</h2>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-3">
            <div className="card">
              <div className="card-body">
                <img
                  src={ImgEntretien}
                  className="img-fluid rounded image"
                  loading="lazy"
                  alt=""
                />
                <h4
                  className="mt-3"
                  style={{ fontFamily: 'Roboto', fontWeight: 700 }}
                >
                  Entretien Ménager
                </h4>
                <p style={{ fontWeight: '400', fontFamily: 'Poppins' }}>
                  Nettoyage de maisons et appartements
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <img
                  src={ImgBricolage}
                  className="img-fluid rounded image"
                  loading="lazy"
                  alt=""
                />
                <h4
                  className="mt-3"
                  style={{ fontFamily: 'Roboto', fontWeight: 700 }}
                >
                  Services de bricolage
                </h4>
                <p style={{ fontWeight: '400', fontFamily: 'Poppins' }}>
                  Petits travaux de réparation et d'entretien
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <img
                  src={ImgPlomberie}
                  className="img-fluid rounded image"
                  loading="lazy"
                  alt=""
                />
                <h4
                  className="mt-3"
                  style={{ fontFamily: 'Roboto', fontWeight: 700 }}
                >
                  Plomberie et électricité
                </h4>
                <p style={{ fontWeight: '400', fontFamily: 'Poppins' }}>
                  Installation, maintenance et dépannage
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <img
                  src={ImgJardinage}
                  className="img-fluid rounded image"
                  loading="lazy"
                  alt=""
                />
                <h4
                  className="mt-3"
                  style={{ fontFamily: 'Roboto', fontWeight: 700 }}
                >
                  Jardinage
                </h4>
                <p style={{ fontWeight: '400', fontFamily: 'Poppins' }}>
                  Entretien de jardins, aménagement
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <img
                  src={ImgAutre}
                  className="img-fluid rounded image"
                  loading="lazy"
                  alt=""
                />
                <h4
                  className="mt-3"
                  style={{ fontFamily: 'Roboto', fontWeight: 700 }}
                >
                  Autre service personnalisés
                </h4>
                <p style={{ fontWeight: '400', fontFamily: 'Poppins' }}>
                  Selon les demandes des clients
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuiNousSomme
