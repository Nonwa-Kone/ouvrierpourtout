import React from 'react'

import AvatarOuvriers from '../../../assets/images/avatar-ouvriers.jpeg'

import { useNavigate } from 'react-router-dom'
import { dataFaker, experience } from '../../../assets/constant/dataFaker'
import { useOuvriers } from '../../../hooks'
import { filterPartner } from '../../../types/partners.type'
import Spinner from '../../shared/Loader'
import { Pagination } from '../../shared/Pagination'
import './index.css'

const RetrouverUnOuvrier: React.FC = () => {
  const [filteredProfession, setFilteredProfession] = React.useState<
    { name: string; value: string }[]
  >([])

  const [filter, setFilter] = React.useState<filterPartner>({
    jobs: '',
    speciality: '',
    diploma: '',
    experience: '',
    availability: '',
    city: '',
    zipCode: '',
    country: '',
    street: '',
    municipality: '',
    limit: 10,
    page: 1,
  })
  const [formState, setFormState] = React.useState(filter)
  const navigate = useNavigate()

  const { data, isPending, refetch } = useOuvriers({ filter })

  const categorieMap = dataFaker.map((data) => {
    return { name: data.categorie, value: data.categorie }
  })

  // Fonction permettant le filtre des corps de métier
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

  // const debounce = (func: (...args: any[]) => void, delay: number) => {
  //   let timeout: NodeJS.Timeout
  //   return (...args: any[]) => {
  //     clearTimeout(timeout)
  //     timeout = setTimeout(() => func(...args), delay)
  //   }
  // }

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number,
  ): T => {
    let timeout: NodeJS.Timeout
    return ((...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }) as T
  }

  // Utilisation
  const debouncedSetFilter = React.useMemo(
    () => debounce((newFilter: filterPartner) => setFilter(newFilter), 300),
    [setFilter],
  )

  if (isPending) {
    return <Spinner />
  }

  return (
    <div className="container-fluid ouvrier-recherche">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <h2 className="mb-3">Rechercher un ouvrier</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3 col-md-4 mb-3 mb-lg-0">
            <div className="card">
              <div className="card-body">
                <h4 className="mb-3">Critère de recherche</h4>
                <form action="" method="post">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-6 form-group mb-3">
                      <label className="form-label" htmlFor="">
                        Secteur d'Activités
                      </label>
                      <select
                        name="jobs"
                        id="jobs"
                        defaultValue={filter.jobs}
                        value={filter.jobs}
                        className="form-select"
                        onChange={(e) => {
                          filteredMapProfession(e.target.value)
                          // setFormState((prev) => ({
                          //   ...prev,
                          //   jobs: e.target.value,
                          // }))
                          const updatedFilter = {
                            ...filter,
                            jobs: e.target.value,
                          }
                          debouncedSetFilter(updatedFilter)
                        }}
                      >
                        <option value="">
                          Selectionnez un secteur d'activité
                        </option>
                        {categorieMap.map((secteur, index) => (
                          <option key={index} value={secteur.value}>
                            {secteur.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-6 form-group mb-3">
                      <label className="form-label" htmlFor="">
                        Spécialités
                      </label>
                      <select
                        name="speciality"
                        id="speciality"
                        className="form-select"
                        defaultValue={filter.speciality}
                        value={filter.speciality}
                        onChange={(e) => {
                          debouncedSetFilter({
                            ...filter,
                            speciality: e.target.value,
                          })
                          // setFormState((prev) => ({
                          //   ...prev,
                          //   speciality: e.target.value,
                          // }))
                        }}
                      >
                        <option value="">
                          Selectionnez un secteur d'activité
                        </option>
                        {filteredProfession.map((secteur, index) => (
                          <option key={index} value={secteur.value}>
                            {secteur.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-6 form-group mb-3">
                      <label className="form-label" htmlFor="">
                        Année d'expérience
                      </label>
                      <select
                        name="experience"
                        id="experience"
                        className="form-select"
                        defaultValue={filter.speciality}
                        value={filter.experience}
                        onChange={(e) => {
                          debouncedSetFilter({
                            ...filter,
                            experience: e.target.value,
                          })
                          // setFormState((prev) => ({
                          //   ...prev,
                          //   experience: e.target.value,
                          // }))
                        }}
                      >
                        <option value="">
                          Selectionnez un secteur d'activité
                        </option>
                        {experience.map((exp, index) => (
                          <option key={index} value={exp}>
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-6 form-group mb-3">
                      <label className="form-label" htmlFor="">
                        Commune
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                      />
                    </div>
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => setFilter(formState)}
                      title="Rechercher des ouvriers en fonction des critères sélectionnés"
                    >
                      Rechercher
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => refetch()}
                      title="Annuler le filtre"
                    >
                      Annuler le filtre
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-8">
            <div className="row">
              {data?.data?.length === 0 && (
                <p className="text-center">
                  Aucun ouvrier trouvé pour ces critères.
                </p>
              )}
              {data?.data?.map((ouvrier: any) => (
                <div
                  className="col-lg-6 col-md-6 col-sm-12 mb-3"
                  key={ouvrier._id}
                >
                  <div className="card">
                    <div className="card-body">
                      <img
                        src={ouvrier?.profFile?.fileUrl || AvatarOuvriers}
                        className="img-fluid"
                        alt="Images des ouvriers"
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          aspectRatio: '32/9',
                        }}
                      />
                      <div className="card-desc text-center mt-3">
                        <h6>
                          {ouvrier?.personalInfos?.firstName}{' '}
                          {ouvrier?.personalInfos?.lastName}
                        </h6>
                        <p>
                          Numéro de téléphone{' '}
                          {ouvrier?.personalInfos?.phoneNumber}
                        </p>
                        <p>
                          Profession{' '}
                          <strong>{ouvrier?.profession?.jobs}</strong>
                        </p>
                        <button
                          className="btn btn-primary"
                          onClick={() =>
                            navigate(
                              `/retrouver-un-ouvrier/${ouvrier._id}/detail`,
                            )
                          }
                        >
                          Voir son profil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <Pagination
                currentPage={data?.currentPage as number}
                totalPages={data?.totalPages as number}
                onPageChange={(page) =>
                  setFilter((prev) => ({ ...prev, page }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RetrouverUnOuvrier
