import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/additives'

const getAdditives = async () => {
  const response = await axios.get(`${API_URL}?limit=100`)
  return response.data
}

const getAdditive = async (additiveId) => {
  const response = await axios.get(`${API_URL}/${additiveId}`)
  return response.data
}

const createAdditive = async (additiveData) => {
  const response = await axios.post(API_URL, additiveData)
  return response.data
}

const updateAdditive = async (additiveId, updatedData) => {
  const response = await axios.put(`${API_URL}/${additiveId}`, updatedData)
  return response.data
}

const deleteAdditive = async (additiveId) => {
  const response = await axios.delete(`${API_URL}/${additiveId}`)
  return response.data
}

const additiveService = {
  getAdditives,
  getAdditive,
  createAdditive,
  updateAdditive,
  deleteAdditive,
}

export default additiveService
