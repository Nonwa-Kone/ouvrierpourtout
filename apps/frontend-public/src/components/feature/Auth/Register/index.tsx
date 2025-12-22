import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StepFive from './StepFive'
import StepFour from './StepFour'
import StepOne from './StepOne'
import StepSeven from './StepSeven'
import StepSix from './StepSix'
import StepThree from './StepThree'
import StepTwo from './StepTwo'
import StepEigth from './StepEight'
import StepNine from './StepNine'

const Register: React.FC = () => {
  const [step, setStep] = useState(1)

  const stepTitles = [
    '',
    'Votre nom et prénoms?',
    'Numéro de téléphone et E-mail',
    'Information de date naissance ainsi que la nationalité',
    'Pour les étrangers',
    'Entrer votre situation de famille',
    'Entrer les informations de votre numéro CMU',
    'Quel est le montant de votre capital social ?',
    'Dans quelle banque le compte sera t-il ouvert ?',
    'Télécharger Les documents qui sont à votre disposition actuellement',
  ]

  const DisplayStep = () => {
    switch (step) {
      case 1:
        return <StepOne />
      case 2:
        return <StepTwo />
      case 3:
        return <StepThree />
      case 4:
        return <StepFour />
      case 5:
        return <StepFive />
      case 6:
        return <StepSix />
      case 7:
        return <StepSeven />
      case 8:
        return <StepEigth />
      case 9:
        return <StepNine />
      default:
        break
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }
  return (
    <div className="container shadow bg-white">
      <div className="mb-3">
        <Link className="btn btn-danger" to={'/auth/login'}>
          Retour à l'espace de connexion
        </Link>
      </div>
      <div className="row">
        {/* <ToastContainer /> */}
        <div className="progress my-2 mb-4">
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow={25}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              width:
                step === 1
                  ? '10.6%'
                  : step === 2
                    ? '20.2%'
                    : step === 3
                      ? '30.2%'
                      : step === 4
                        ? '40.2%'
                        : step === 5
                          ? '50.2%'
                          : step === 6
                            ? '60.2%'
                            : step === 7
                              ? '70.2%'
                              : step === 8
                                ? '80.2%'
                                : step === 9
                                  ? '90.2%'
                                  : step === 10
                                    ? '100%'
                                    : '',
            }}
          ></div>
        </div>
        <h4 className="mb-4">{stepTitles[step]}</h4>
        <hr style={{ border: '10px solid green' }} />
        {/* PARTIE FORMULAIRE */}
        <form onSubmit={handleSubmit}>
          <div>{DisplayStep()}</div>
          <div className="btn-group pb-3 mt-3">
            <button
              className={
                step === 1
                  ? 'd-none'
                  : step === stepTitles.length
                    ? 'd-none'
                    : 'd-block btn btn-primary btn-lg'
              }
              onClick={() => {
                setStep((currentPage) => currentPage - 1)
              }}
            >
              Retour
            </button>
            <button
              type={step === stepTitles.length ? 'submit' : 'button'}
              className={
                step === stepTitles.length
                  ? 'd-none'
                  : 'd-block btn btn-primary btn-lg'
              }
              onClick={() => {
                if (step === stepTitles.length) {
                  // formData.activity = allActivity
                }
                setStep((currentPage) => currentPage + 1)
              }}
            >
              {step === stepTitles.length - 1 ? 'Valider' : 'Continuer'}
            </button>
          </div>
        </form>
        {/* PARTIE BOUTON DE CONTROL */}
      </div>
    </div>
  )
}

export default Register
