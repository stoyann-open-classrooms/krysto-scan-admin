import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const voluntaryDropPointURL = '/voluntaryDropPoints'

const getVoluntaryDropPoints = async () => {
  const response = await axios.get(`${API_URL}${voluntaryDropPointURL}`)
  return response.data
}

const getVoluntaryDropPoint = async (voluntaryDropPointId) => {
  const response = await axios.get(
    `${API_URL}${voluntaryDropPointURL}/${voluntaryDropPointId}`,
  )
  return response.data
}

const createVoluntaryDropPoint = async (voluntaryDropPointData) => {
  const response = await axios.post(
    `${API_URL}${voluntaryDropPointURL}`,
    voluntaryDropPointData,
  )
  return response.data
}

const updateVoluntaryDropPoint = async (voluntaryDropPointId, updatedData) => {
  const response = await axios.put(
    `${API_URL}${voluntaryDropPointURL}/${voluntaryDropPointId}`,
    updatedData,
  )
  return response.data
}

const deleteVoluntaryDropPoint = async (voluntaryDropPointId) => {
  const response = await axios.delete(
    `${API_URL}${voluntaryDropPointURL}/${voluntaryDropPointId}`,
  )
  return response.data
}

const getVoluntaryDropPointsInRadius = async (zipcode, distance) => {
  const response = await axios.get(
    `${API_URL}${voluntaryDropPointURL}/radius/${zipcode}/${distance}`,
  )
  return response.data
}

const voluntaryDropPointService = {
  getVoluntaryDropPoints,
  getVoluntaryDropPoint,
  createVoluntaryDropPoint,
  updateVoluntaryDropPoint,
  deleteVoluntaryDropPoint,
  getVoluntaryDropPointsInRadius,
}

export default voluntaryDropPointService
