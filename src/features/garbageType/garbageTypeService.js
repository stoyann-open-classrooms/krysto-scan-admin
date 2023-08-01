import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const garbageTypeURL = '/garbageTypes'

const getGarbageTypes = async () => {
  const response = await axios.get(`${API_URL}${garbageTypeURL}`)
  return response.data
}

const getGarbageType = async (garbageTypeId) => {
  const response = await axios.get(
    `${API_URL}${garbageTypeURL}/${garbageTypeId}`,
  )
  return response.data
}

const createGarbageType = async (garbageTypeData) => {
  const response = await axios.post(
    `${API_URL}${garbageTypeURL}`,
    garbageTypeData,
  )
  return response.data
}

const updateGarbageType = async (garbageTypeId, updatedData) => {
  const response = await axios.put(
    `${API_URL}${garbageTypeURL}/${garbageTypeId}`,
    updatedData,
  )
  return response.data
}

const deleteGarbageType = async (garbageTypeId) => {
  const response = await axios.delete(
    `${API_URL}${garbageTypeURL}/${garbageTypeId}`,
  )
  return response.data
}

const garbageTypeService = {
  getGarbageTypes,
  getGarbageType,
  createGarbageType,
  updateGarbageType,
  deleteGarbageType,
}

export default garbageTypeService
