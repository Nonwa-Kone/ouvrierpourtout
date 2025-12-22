import axios from 'axios'
import { filterPartner } from '../types/partners.type'

const API_URL = 'https://tiers-service.vercel.app'
// const API_URL = 'http://localhost:3000'

export const getAllOuvriers = async (
  query: filterPartner,
): Promise<{
  message: string
  success?: boolean
  data?: any
  count: number
  currentPage: number
  totalPages: number
  nextPage: number
  prevPage: number
}> => {
  try {
    const response = await axios.get(`${API_URL}/ouvriers`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: query,
    })
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getOuvrierById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/ouvriers/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const createEvaluation = async (evaluation: {
  username: string
  note: string
  comment: string
}) => {
  try {
    const response = await axios.post(`${API_URL}/evaluation`, evaluation)
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}
export const getEvaluationByOuvrierId = async (
  id: string,
): Promise<{
  data: { username: string; note: number; comment: string }[]
  success: boolean
  message: string
}> => {
  try {
    const response = await axios.get(`${API_URL}/evaluation/${id}`)
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}
