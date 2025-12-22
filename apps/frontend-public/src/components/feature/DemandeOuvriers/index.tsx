// ** React Imports
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { redirect } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createDemande } from '../../../api/demande.api'
import { dataFaker } from '../../../assets/constant/dataFaker'
import { queryClient } from '../../../assets/utils/queryClient'
import { tDemande } from '../../../types/demande.type'

import BesoinImgZero from '../../../assets/images/besoin-img-0.jpg'
import './index.css'

const initDemande = {
  _id: '',
  profession: '',
  speciality: '',
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    address: {
      country: "Côte d'Ivoire",
      city: '',
      municipality: '',
      street: '',
      zipCode: '00225',
    },
  },
  description: '',
  assignedTo: '',
  status: 'pending',
  createdAt: '',
  updatedAt: '',
  reference: '',
}

const DemandeOuvriers: React.FC = () => {
  // const socket = io('ws://localhost:3000', {
  //   timeout: 10000,
  //   reconnection: true,
  //   reconnectionDelay: 1000,
  //   reconnectionDelayMax: 5000,
  //   reconnectionAttempts: 5,
  //   autoConnect: false,
  // }) // Assurez-vous que l'URL est correcte

  const [formDemande, setFormDemande] = React.useState<tDemande>(
    initDemande as tDemande,
  )

  const [filteredProfession, setFilteredProfession] = React.useState<
    { name: string; value: string }[]
  >([])

  const mutation = useMutation({
    mutationKey: ['demande', 'create'],
    mutationFn: async (demande: tDemande) => {
      const response = await createDemande(demande)
      console.log(response)
    },
    onSuccess: (data: any) => {
      setFormDemande(initDemande as tDemande)
      redirect('/')

      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ['demande'] })
    },
    onError: (error) => {
      console.log(error)
      toast.error('une erreur est survenue')
    },
  })

  // const connectSocket = (socket: any) => {
  //   socket.on('connect', () => {
  //     console.log('Connected to socket.io server ' + socket.id)
  //   })

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from socket.io server')
  //   })
  // }

  // React.useEffect(() => {
  //   // Connecter le socket
  //   connectSocket(socket)

  //   // Cleanup : déconnecte le socket à la fin
  //   return () => {
  //     socket.disconnect()
  //     console.log('Socket disconnected')
  //   }
  // }, [])

  // handle input change
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target

    setFormDemande((prev) => {
      const newState = { ...prev }

      switch (name) {
        case 'firstName':
        case 'lastName':
        case 'phoneNumber':
        case 'gender':
        case 'email':
          newState.customer = { ...prev.customer, [name]: value }
          break
        case 'city':
        case 'municipality':
        case 'street':
        case 'zipCode':
          newState.customer = {
            ...prev.customer,
            address: { ...prev.customer?.address, [name]: value },
          }
          break
        default:
          newState[name as keyof tDemande] = value
          break
      }
      return newState
    })
  }

  const jobsMap: { label: string; value: string }[] = dataFaker.map((job) => {
    return { label: job.categorie, value: job.categorie }
  })

  const filteredMapProfession = (categorie: string) => {
    const filteredProfession = dataFaker
      ?.find((data) => data.categorie === categorie)
      ?.specialite?.map((data) => {
        return { name: data, value: data }
      })
    setFilteredProfession(
      filteredProfession as { name: string; value: string }[],
    )
  }

  const specialityMap = filteredProfession.map((specialite) => {
    return { label: specialite.name, value: specialite.value }
  })

  // validation form
  const validateForm = (form: tDemande): string | null => {
    if (!form.customer) return 'Vous devez remplir tous les champs'
    const { firstName, lastName, phoneNumber, gender, address } = form.customer

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !gender ||
      !address?.country ||
      !address?.city ||
      !address?.municipality ||
      !address?.street ||
      !address?.zipCode ||
      !form.profession ||
      !form.description
    ) {
      return 'Vous devez remplir tous les champs'
    }

    if (
      !phoneNumber.match(/^\+\d{1,3}\d{9,}$/) &&
      !phoneNumber.match(/^\d{10}$/)
    ) {
      return 'Le numéro de téléphone doit être de 10 chiffres ou de 10 chiffres avec un code pays'
    }
    if (!address.zipCode.match(/^\d{5}$/)) {
      return 'Le code postal doit être de 5 chiffres'
    }

    return null // Aucun problème trouvé
  }

  // envoie des donnée avec l'utilisation de socketio
  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault()

  //   try {
  //     const validationError = validateForm(formDemande)
  //     if (validationError) {
  //       toast.error(validationError)
  //       return
  //     }

  //     const payload: tDemande = {
  //       customer: formDemande.customer,
  //       profession: formDemande.profession,
  //       speciality: formDemande.speciality,
  //       description: formDemande.description,
  //     }

  //     socket.connect()

  //     // Emit create order event
  //     socket.emit('order:create', payload)

  //     // Listen for response once
  //     socket.once('order:create:response', (response) => {
  //       if (response.success) {
  //         toast.success(response.message || 'Demande créée avec succès')
  //       } else {
  //         toast.error(response.message || 'Erreur lors de la création')
  //       }
  //     })
  //   } catch (error) {
  //     toast.error('Une erreur est survenue')
  //     console.error(error)
  //   } finally {
  //     console.log('formDemande', formDemande)
  //   }
  // }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log('formDemande', formDemande)
    const validationError = validateForm(formDemande)
    if (validationError) {
      toast.error(validationError)
      return
    }
    const payload: tDemande = {
      customer: formDemande.customer,
      profession: formDemande.profession,
      speciality: formDemande.speciality,
      description: formDemande.description,
    }
    mutation.mutate(payload)
  }
  return (
    <div className="container-fluid demandeOuvriers">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <h4>Passer la demande</h4>
        </div>
        <div className="row">
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src={BesoinImgZero}
              className="img-fluid"
              alt="Images de representation du formulaire de contact"
            />
          </div>
          <div className="col-lg-6">
            <form method="post" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="firstName">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                    value={formDemande.customer?.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="lastName">
                    Prénoms
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="form-control"
                    value={formDemande.customer?.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="phoneNumber">
                    Numéro de téléphone
                  </label>
                  <PhoneInput
                    className="form-control"
                    defaultCountry="CI"
                    initialValueFormat="national"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="(+000) 00 00 00 0000"
                    onChange={(e) =>
                      setFormDemande((prev) => ({
                        ...prev,
                        customer: {
                          ...prev.customer,
                          phoneNumber: e,
                        },
                      }))
                    }
                    defaultValue={formDemande?.customer?.phoneNumber}
                    value={formDemande?.customer?.phoneNumber}
                    required
                    title="Champ de saisie numéro de téléphone obligatoire"
                    error={
                      formDemande?.customer?.phoneNumber
                        ? isValidPhoneNumber(formDemande?.customer?.phoneNumber)
                          ? undefined
                          : 'Invalid phone number'
                        : 'Phone number required'
                    }
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="gender">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    value={formDemande.customer?.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="gender">
                    Sexe
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    className="form-select"
                    value={formDemande.customer?.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Selectionnez votre sexe</option>
                    <option value="man">Homme</option>
                    <option value="woman">Femme</option>
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="profession">
                    Corps de métier
                  </label>
                  <select
                    name="profession"
                    id="profession"
                    className="form-select"
                    aria-describedby="professionHelp"
                    value={formDemande.profession}
                    defaultValue={formDemande.profession}
                    onChange={(e) => {
                      handleInputChange(e)
                      filteredMapProfession(e.target.value)
                    }}
                  >
                    <option value="">Selectionnez un secteur d'activité</option>
                    {jobsMap.map((secteur, index) => (
                      <option key={index} value={secteur.value}>
                        {secteur.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="speciality">
                    Spécialité
                  </label>
                  <select
                    name="speciality"
                    id="speciality"
                    className="form-select"
                    value={formDemande.speciality}
                    defaultValue={formDemande.speciality}
                    onChange={handleInputChange}
                    aria-describedby="specialityHelp"
                  >
                    <option value="">Selectionnez un secteur d'activité</option>
                    {specialityMap.map((secteur, index) => (
                      <option key={index} value={secteur.value}>
                        {secteur.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="city">
                    Ville
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="form-control"
                    placeholder="Ville"
                    value={formDemande.customer?.address?.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="municipality">
                    Commune
                  </label>
                  <input
                    type="text"
                    name="municipality"
                    id="municipality"
                    className="form-control"
                    placeholder="Commune"
                    value={formDemande.customer?.address?.municipality}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="street">
                    Rue
                  </label>
                  <input
                    type="text"
                    name="street"
                    id="street"
                    className="form-control"
                    placeholder="Rue"
                    value={formDemande.customer?.address?.street}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-12 col-md-12 col-sm-6 form-group mb-3">
                  <label className="form-label" htmlFor="description-demande">
                    Faite une brief description de la demande
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    value={formDemande.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button
                disabled={mutation.isPending}
                className="btn btn-primary"
                type="submit"
              >
                {mutation.isPending ? 'En cours...' : 'Soumettre'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemandeOuvriers
