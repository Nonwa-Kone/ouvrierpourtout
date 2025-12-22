import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { createOrderFromProfileOuvrier } from '../api/demande.api'
import {
  createEvaluation,
  getAllOuvriers,
  getEvaluationByOuvrierId,
  getOuvrierById,
} from '../api/ouvrier.api'
import { queryClient } from '../assets/utils/queryClient'
import { useModalStore } from '../store/modal.store'
import { filterPartner } from '../types/partners.type'

export const useOuvriers = ({ filter }: { filter: filterPartner }) => {
  return useQuery({
    queryKey: ['ouvriers', 'list', Object.values({ ...filter })],
    queryFn: async () => await getAllOuvriers(filter),
  })
}

export const useOuvrier = (id: string) => {
  return useQuery({
    queryKey: ['ouvrier', id],
    queryFn: () => getOuvrierById(id),
  })
}

export const prefetchTodos = async () => {
  //   The results of this query will be cached like a normal query
  await queryClient.prefetchQuery({
    queryKey: ['ouvriers', 'prefetch'],
    queryFn: () => {},
  })
}

// Reccuppérer une les evaluation d'un ouvrier
export const useEvaluationOuvrierByOuvrierId = (id: string) => {
  return useQuery({
    queryKey: ['evaluation', 'list', id],
    queryFn: () => getEvaluationByOuvrierId(id),
  })
}

// Enregistré une evaluation
export const useEvaluateOuvrier = () => {
  return useMutation({
    mutationFn: (data: any) => createEvaluation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ouvriers', 'list'],
      })
      queryClient.invalidateQueries({
        queryKey: ['ouvrier', 'detail'],
      })
      queryClient.invalidateQueries({
        queryKey: ['evaluation', 'list'],
      })
      toast.success('Votre évaluation a bien été enregistrée')
    },
    onError: (error) => {
      throw new Error(error.stack)
    },
  })
}

export const useDemandeFromProfileOuvrier = () => {
  const { setModalSuccessAction, setModalAssignTicketSpecialistAction } =
    useModalStore((s) => s)
  return useMutation({
    mutationFn: ({ data, id }: { data: any; id: string }) =>
      createOrderFromProfileOuvrier(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ouvriers', 'list'],
      })
      queryClient.invalidateQueries({
        queryKey: ['ouvrier', 'detail'],
      })
      queryClient.invalidateQueries({
        queryKey: ['evaluation', 'list'],
      })
      toast.success('Votre demande a bien été enregistrée')
      setModalAssignTicketSpecialistAction('assignTicketSpecialistModal', false)
      setModalSuccessAction('successModal', true)
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
