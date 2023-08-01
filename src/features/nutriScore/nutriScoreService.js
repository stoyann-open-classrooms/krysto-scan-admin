import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/nutriScores'

const getNutriScores = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getNutriScore = async (nutriScoreId) => {
  const response = await axios.get(`${API_URL}/${nutriScoreId}`)
  return response.data
}
const createNutriScore = async (nutriScoreData) => {
  const response = await axios.post(API_URL, nutriScoreData)
  return response.data
}
const updateNutriScore = async (nutriScoreId, updatedData) => {
  const response = await axios.put(`${API_URL}/${nutriScoreId}`, updatedData)
  return response.data
}
const addNutriScorePhoto = async (nutriScoreId, photoData) => {
  const response = await axios.put(
    `${API_URL}/${nutriScoreId}/photo`,
    photoData,
  )
  return response.data
}

const nutriScoreService = {
  getNutriScores,
  getNutriScore,
  createNutriScore,
  updateNutriScore,
  addNutriScorePhoto,
}

export default nutriScoreService
