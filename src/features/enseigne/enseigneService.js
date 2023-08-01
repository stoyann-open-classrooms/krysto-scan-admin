import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/enseignes'

const getEnseignes = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getEnseigne = async (enseigneId) => {
  const response = await axios.get(`${API_URL}/${enseigneId}`)
  return response.data
}
const createEnseigne = async (enseigneData) => {
  const response = await axios.post(API_URL, enseigneData)
  return response.data
}
const updateEnseigne = async (enseigneId, updatedData) => {
  const response = await axios.put(`${API_URL}/${enseigneId}`, updatedData)
  return response.data
}
const addEnseignePhoto = async (enseigneId, photoData) => {
  const response = await axios.put(`${API_URL}/${enseigneId}/photo`, photoData)
  return response.data
}

const enseigneService = {
  getEnseignes,
  getEnseigne,
  createEnseigne,
  updateEnseigne,
  addEnseignePhoto,
}

export default enseigneService
