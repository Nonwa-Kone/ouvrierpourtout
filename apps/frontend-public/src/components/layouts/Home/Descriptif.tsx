import './index.css'

export const Descriptif = () => {
  return (
    <div className="container-fluid descriptif">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-4 d-none d-lg-block descriptif-image">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt=""
              className="img-fluid"
              loading="lazy"
              width={400}
              height={400}
            />
          </div>
          <div className="col-12 col-lg-8 descriptif-content">
            <h1 className="text-white">
              Votre application de prestation de service est près !
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
              rerum est voluptate fugit odio laboriosam deserunt praesentium
              nesciunt! Pariatur veritatis explicabo quis laboriosam est
              dignissimos magni repudiandae nulla iusto quas!
            </p>

            <button className="btn btn-primary">Demander un ouvrier</button>
          </div>
        </div>
      </div>
    </div>
  )
}
