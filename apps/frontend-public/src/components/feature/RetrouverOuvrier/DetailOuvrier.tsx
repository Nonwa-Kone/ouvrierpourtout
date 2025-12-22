import { ImSpinner11 } from 'react-icons/im'
import { IoStarSharp } from 'react-icons/io5'
import { useParams } from 'react-router-dom'
import {
  useEvaluateOuvrier,
  useEvaluationOuvrierByOuvrierId,
  useOuvrier,
} from '../../../hooks'
import Spinner from '../../shared/Loader'

import React from 'react'
import AvatarOuvriers from '../../../assets/images/avatar-ouvriers.jpeg'
import { useModalStore } from '../../../store/modal.store'
import { usePartnersStore } from '../../../store/partners.store'
import { tPartner } from '../../../types/partners.type'
import { ModalRender } from '../../shared/modals'

export default function DetailOuvrier() {
  const { id } = useParams<{ id: string }>()

  const { data, isPending } = useOuvrier(id as string)

  if (isPending) return <Spinner />

  return (
    <div className="detailOuvrierPage">
      <ModalRender />

      <div className="container">
        <ProfilOuvrier data={data.data} />
        <RealisationOuvrier data={data.data} />
        <ListEvaluationByOuvrier />
        <EvaluationOuvrier />
      </div>
    </div>
  )
}

const ProfilOuvrier = ({ data }: { data: tPartner }) => {
  const setModalAssignTicketSpecialistAction = useModalStore(
    (s) => s.setModalAssignTicketSpecialistAction,
  )
  const setPartnerStore = usePartnersStore((s) => s.setPartnerStore)
  return (
    <div className="row profile-ouvrier">
      <div className="col-lg-6 col-md-6 col-sm-12">
        <div className="card profile-ouvrier-card-img">
          <div className="card-body">
            <img
              src={data.profFile?.fileUrl || AvatarOuvriers}
              //   className="img-fluid"
              alt="Images des ouvriers"
              loading="lazy"
              title="Photo de profil de l'ouvrier"
            />
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-12">
        <h2 className="mb-3">
          {data.personalInfos?.firstName} {data.personalInfos?.lastName}
        </h2>
        <p>
          {data?.profession?.jobs} spécialiser dans{' '}
          {data.profession?.speciality}{' '}
          {data.profession?.experience + " année d'expérience"}
        </p>
        <p>Numéro de téléphone {data.personalInfos?.phoneNumber}</p>
        <p>
          Adresse de localisation :{' '}
          {data.address?.country +
            ', ' +
            data.address?.city +
            ', ' +
            data.address?.municipality +
            ', ' +
            data.address?.street +
            ', ' +
            data.address?.zipCode}
        </p>
        <p>Numéro villa : {data.address?.villa ?? '-'}</p>
        <p></p>
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setPartnerStore('partner', data)
              setModalAssignTicketSpecialistAction(
                'assignTicketSpecialistModal',
                true,
              )
            }}
          >
            Démander un devis
          </button>
          <button type="button" className="btn btn-secondary">
            Evaluer
          </button>
        </div>
      </div>
    </div>
  )
}

const RealisationOuvrier = ({ data }: { data: tPartner }) => {
  return (
    <div className="row" style={{ width: '100%' }}>
      <div className="section-title">
        <h2>Projets réalisés</h2>
      </div>
      <div className="project-list" style={{ width: '100%' }}>
        {data.realization && data.realization.length > 0 ? (
          data.realization.map((project, index) => (
            <div className="card" key={index || project.fileUrl}>
              <div className="card-body">
                <img
                  src={project.fileUrl}
                  alt={project.fileName || "Image d'un projet"}
                  loading="lazy"
                  title="Photo de projet"
                />
              </div>
            </div>
          ))
        ) : (
          <p>Aucun projet réalisé pour l'instant.</p>
        )}
      </div>
    </div>
  )
}

const ListEvaluationByOuvrier = () => {
  const { id } = useParams<{ id: string }>()
  const { data: evaluations } = useEvaluationOuvrierByOuvrierId(id as string)

  const splitText = (text: string) => {
    const first = text.split(' ')[0]?.substring(0, 1).toLocaleUpperCase()
    const second = text.split(' ')[1]?.substring(0, 1).toLocaleUpperCase() || ''
    return first + ' ' + second
  }

  const repeatStartIcons = (data: number) => {
    const startIcons = []
    for (let i = 0; i < data; i++) {
      startIcons.push(<IoStarSharp color="yellow" />)
    }
    return startIcons
  }

  return (
    <div className="evaluate-box-container">
      <div className="section-title">
        <h2>Avis et témoignages</h2>
      </div>
      <div className="evaluate-box">
        {evaluations &&
          evaluations?.data?.map((evaluation) => (
            <div className="card">
              <div className="card-body">
                <p className="card-text">{evaluation.comment}</p>
                <div className="d-flex justify-content-between gap-2">
                  <div className="d-block p-4 bg-primary rounded-circle text-white fs-4 fw-bold">
                    <span>{splitText(evaluation.username)}</span>
                  </div>
                  <div>
                    <h5 className="card-title">{evaluation.username}</h5>
                    <p className="card-text">
                      {repeatStartIcons(evaluation.note)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

const EvaluationOuvrier = () => {
  return (
    <div className="row my-5 evaluate" style={{ width: '100%' }}>
      <div className="section-title">
        <h2>Evaluations</h2>
      </div>
      <FormEvaluation />
    </div>
  )
}

const FormEvaluation = () => {
  const { id } = useParams<{ id: string }>()
  const [evaluation, setEvaluation] = React.useState<{
    username: string
    note: string
    comment: string
  }>({
    username: '',
    note: '',
    comment: '',
  })

  const mutation = useEvaluateOuvrier()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEvaluation((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const payload = {
      username: evaluation.username,
      note: evaluation.note,
      comment: evaluation.comment,
      ouvrier: id,
    }
    mutation.mutate(payload)
    setEvaluation({ ...evaluation, note: '', comment: '', username: '' })
  }

  return (
    <div className="row" style={{ width: '100%' }}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nom complet</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            onChange={handleChange}
            defaultValue={evaluation.username}
            value={evaluation.username}
            required
            title="Champ de saisie nom complet obligatoire"
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Note</label>
          <input
            type="number"
            className="form-control"
            id="note"
            name="note"
            placeholder="Note"
            onChange={handleChange}
            defaultValue={evaluation.note}
            value={evaluation.note}
            required
            title="Champ de saisie note obligatoire"
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Commentaire</label>
          <textarea
            className="form-control"
            name="comment"
            id="comment"
            cols={30}
            rows={10}
            onChange={handleChange}
            defaultValue={evaluation.comment}
            value={evaluation.comment}
            title="Champ de saisie commentaire obligatoire"
          ></textarea>
        </div>
        <button
          className="btn btn-primary"
          disabled={mutation.isPending}
          type="submit"
          title="Bouton de validation et envoie des données sur le serveur"
        >
          {mutation.isPending ? <ImSpinner11 /> : 'Evaluer'}
        </button>
      </form>
    </div>
  )
}
