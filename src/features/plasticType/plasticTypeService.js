import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL
const plasticTypeURL = '/plasticTypes'

const getPlasticTypes = async () => {
  const response = await axios.get(`${API_URL}${plasticTypeURL}`)
  return response.data
}

const getPlasticType = async (serviceId) => {
  const response = await axios.get(`${API_URL}${plasticTypeURL}/${serviceId}`)
  return response.data
}

const createPlasticType = async (plasticTypeData) => {
  const response = await axios.post(
    `${API_URL}${plasticTypeURL}`,
    plasticTypeData,
  )
  return response.data
}
const updatePlasticType = async (plasticTypeId, updatedData) => {
  const response = await axios.put(`${API_URL}/${plasticTypeId}`, updatedData)
  return response.data
}

const addPlasticTypeIcone = async (plasticTypeId, iconeData) => {
  const response = await axios.put(
    `${API_URL}/${plasticTypeId}/icone`,
    iconeData,
  )
  return response.data
}

const plasticTypeService = {
  getPlasticType,
  getPlasticTypes,
  createPlasticType,
  updatePlasticType,
  addPlasticTypeIcone,
}

export default plasticTypeService
