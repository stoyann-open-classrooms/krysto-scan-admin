import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/ecoScores'

const getEcoScores = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getEcoScore = async (ecoScoreId) => {
  const response = await axios.get(`${API_URL}/${ecoScoreId}`)
  return response.data
}
const createEcoScore = async (ecoScoreData) => {
  const response = await axios.post(API_URL, ecoScoreData)
  return response.data
}
const updateEcoScore = async (ecoScoreId, updatedData) => {
  const response = await axios.put(`${API_URL}/${ecoScoreId}`, updatedData)
  return response.data
}
const addEcoScorePhoto = async (ecoScoreId, photoData) => {
  const response = await axios.put(`${API_URL}/${ecoScoreId}/photo`, photoData)
  return response.data
}

const ecoScoreService = {
  getEcoScores,
  getEcoScore,
  createEcoScore,
  updateEcoScore,
  addEcoScorePhoto,
}

export default ecoScoreService
