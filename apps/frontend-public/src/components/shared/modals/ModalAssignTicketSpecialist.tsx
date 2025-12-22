import React from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { useParams } from 'react-router-dom'

import { useDemandeFromProfileOuvrier } from '../../../hooks'
import { useModalStore } from '../../../store/modal.store'
import { usePartnersStore } from '../../../store/partners.store'
import { tDemande } from '../../../types/demande.type'
import { ModalLayout } from './ModalLayout'

const initDemande = {
  _id: '',
  profession: '',
  speciality: '',
  customer: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    gender: '',
    email: '',
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

export const ModalAssignTicketSpecialist = () => {
  const partner = usePartnersStore((s) => s.partner)

  const id = useParams<{ id: string }>().id
  const [formDemande, setFormDemande] = React.useState<tDemande>(
    initDemande as tDemande,
  )
  const { setModalAssignTicketSpecialistAction } = useModalStore((s) => s)

  const mutation = useDemandeFromProfileOuvrier()

  // handle input change
  const handleChange = (
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
          newState[name as keyof tDemande] = value as any
          break
      }
      return newState
    })
  }

  const handleSubmit = () => {
    const payload: tDemande = {
      customer: {
        ...formDemande.customer,
        address: {
          ...formDemande.customer?.address,
          country: "Côte d'Ivoire",
          city: formDemande.customer?.address?.city,
          municipality: formDemande.customer?.address?.municipality,
          street: formDemande.customer?.address?.street,
          zipCode: '00225',
        },
      },
      profession: partner?.profession?.jobs as string,
      speciality: partner?.profession?.speciality as string,
      description: formDemande.description,
      assignedTo: id,
    }

    mutation.mutate({
      data: payload,
      id: id as string,
    })

    setFormDemande({
      customer: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: {
          country: '',
          city: '',
          municipality: '',
          street: '',
          zipCode: '',
        },
        gender: '',
        email: '',
      },
      profession: '',
      speciality: '',
      description: '',
      assignedTo: id as string,
    })
  }

  return (
    <ModalLayout
      isLoading={mutation.isPending}
      width={1000}
      title={'Commander cet ouvrier'}
      onCancel={() =>
        setModalAssignTicketSpecialistAction(
          'assignTicketSpecialistModal',
          false,
        )
      }
      onClose={() =>
        setModalAssignTicketSpecialistAction(
          'assignTicketSpecialistModal',
          false,
        )
      }
      onValidate={() => handleSubmit()}
    >
      <form>
        <div className="row mb-0 mb-lg-3">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="firstName">Nom</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="Nom"
              onChange={handleChange}
              defaultValue={formDemande?.customer?.firstName}
              value={formDemande?.customer?.firstName}
              required
              title="Champ de saisie nom obligatoire"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="lastName">Prénoms</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Prénoms"
              onChange={handleChange}
              defaultValue={formDemande?.customer?.lastName}
              value={formDemande?.customer?.lastName}
              required
              title="Champ de saisie prenom obligatoire"
            />
          </div>
        </div>
        <div className="row mb-0 mb-lg-3">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone</label>
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
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="example@example.com"
              onChange={handleChange}
              defaultValue={formDemande?.customer?.email}
              value={formDemande?.customer?.email}
              required
              title="Champ de saisie Email obligatoire"
            />
          </div>
        </div>
        <div className="row mb-0 mb-lg-3">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="genre">Genre</label>
            <select
              name="gender"
              id="gender"
              className="form-select"
              onChange={handleChange}
              value={formDemande?.customer?.gender}
              defaultValue={formDemande?.customer?.gender}
            >
              <option value="">Selectionnez un genre</option>
              <option value="man">Homme</option>
              <option value="woman">Femme</option>
            </select>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="Ville"
              onChange={handleChange}
              defaultValue={formDemande?.customer?.address?.city}
              value={formDemande?.customer?.address?.city}
              required
              title="Champ de saisie ville obligatoire"
            />
          </div>
        </div>
        <div className="row mb-0 mb-lg-3">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="municipality">Commune</label>
            <input
              type="text"
              className="form-control"
              id="municipality"
              name="municipality"
              placeholder="Commune"
              onChange={handleChange}
              defaultValue={formDemande?.customer?.address?.municipality}
              value={formDemande?.customer?.address?.municipality}
              required
              title="Champ de saisie commune obligatoire"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3 mb-lg-0 form-group">
            <label htmlFor="street">Rue</label>
            <input
              type="text"
              className="form-control"
              id="street"
              name="street"
              placeholder="Rue"
              onChange={handleChange}
              defaultValue={formDemande?.customer?.address?.street}
              value={formDemande?.customer?.address?.street}
              required
              title="Champ de saisie commune obligatoire"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={5}
            onChange={handleChange}
            defaultValue={formDemande?.description}
            value={formDemande?.description}
            title="Champ de saisie profession obligatoire"
            className="form-control"
          ></textarea>
        </div>
      </form>
    </ModalLayout>
  )
}
