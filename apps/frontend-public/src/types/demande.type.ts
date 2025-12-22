import { tCustomer } from './customer.type'

export type tStatus = 'pending' | 'accepted' | 'refused'

export type tQuery = {
  page?: number
  limit?: number
  status?: tStatus
}

export type tDemande = {
  _id?: string
  customer?: tCustomer
  profession?: string
  speciality?: string
  description?: string
  reference?: string
  status?: tStatus | string
  createdAt?: string
  updatedAt?: string
  assignedTo?: string
}

export type tDemandeResponse = {
  message?: string
  success?: boolean
  data?: tDemande[]
}

export type tDemandeStore = {
  demandes?: tDemande[] | null
  demande?: tDemande | null
  filterDemande?: tDemande | null

  setDemandeStore?: (
    key: keyof tDemandeStore,
    value: tDemandeStore[keyof tDemandeStore],
  ) => void
}
