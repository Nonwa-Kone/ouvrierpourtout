import React from 'react'
import Form from '../Form'

const Newsletter: React.FC = () => {
  return (
    <Form>
      <div className="input-group">
        <input
          type="email"
          name="email"
          id="email"
          className="form-control shadow-none"
          placeholder="Entrer votre e-mail"
        />
        <button type="submit" className="btn btn-dark">
          Souscris
        </button>
      </div>
    </Form>
  )
}

export default Newsletter
