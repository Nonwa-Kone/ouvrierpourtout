import axios from 'axios'
import { tCustomer } from '../types/customer.type'

const API_URL = 'https://tiers-service.vercel.app'
// const API_URL = 'http://localhost:3000'

export const createDemande = async (
  data: tCustomer,
): Promise<{
  message: string
  success?: boolean
  data?: any
}> => {
  try {
    const response = await axios.post(`${API_URL}/order`, data)
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getSecteurs = async () => {
  try {
    const response = await axios.get(`${API_URL}/secteur`)
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const getVilles = async () => {
  try {
    const response = await axios.get(`${API_URL}/ville`)
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}

export const createOrderFromProfileOuvrier = async (
  data: any,
  id: string,
): Promise<{
  message: string
  success?: boolean
  data?: any
}> => {
  try {
    const response = await axios.post(
      `${API_URL}/order/order-from-profile-ouvrier/${id}`,
      data,
    )
    return response.data
  } catch (error) {
    throw new Error(error as string)
  }
}
