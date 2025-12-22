import ContactImg from '../../../assets/images/contact-img.jpg'
import './index.css'

const Contact = () => {
  return (
    <div className="container-fluid contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <img
              src={ContactImg}
              className="img-fluid"
              alt="Images de representation du formulaire de contact"
            />
          </div>
          <div className="col-lg-6">
            <h6 className="fw-bold mb-4">Prenez contact avec nous</h6>
            <form action="" method="post">
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="nom-complet">
                  Nom complet
                </label>
                <span className="text-danger">
                  <sup>*</sup>
                </span>
                <input
                  type="text"
                  name="nom-complet"
                  id="nom-complet"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="email">
                  Email{' '}
                  <span className="text-danger">
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="objet">
                  Quel est l'objet de votre demande{' '}
                  <span className="text-danger">
                    <sup>*</sup>
                  </span>
                </label>
                <input
                  type="text"
                  name="objet"
                  id="objet"
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label" htmlFor="message">
                  Message{' '}
                  <span className="text-danger">
                    <sup>*</sup>
                  </span>
                </label>
                <textarea
                  rows={5}
                  name="message"
                  id="message"
                  className="form-control"
                ></textarea>
              </div>
              <button className="btn btn-primary" type="submit">
                Soumettre
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
