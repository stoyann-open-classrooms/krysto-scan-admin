import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/novascores'

const getNovaScores = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getNovaScore = async (novaScoreId) => {
  const response = await axios.get(`${API_URL}/${novaScoreId}`)
  return response.data
}
const createNovaScore = async (novaScoreData) => {
  const response = await axios.post(API_URL, novaScoreData)
  return response.data
}
const updateNovaScore = async (novaScoreId, updatedData) => {
  const response = await axios.put(`${API_URL}/${novaScoreId}`, updatedData)
  return response.data
}
const addNovaScorePhoto = async (novaScoreId, photoData) => {
  const response = await axios.put(`${API_URL}/${novaScoreId}/photo`, photoData)
  return response.data
}

const novaScoreService = {
  getNovaScores,
  getNovaScore,
  createNovaScore,
  updateNovaScore,
  addNovaScorePhoto,
}

export default novaScoreService
