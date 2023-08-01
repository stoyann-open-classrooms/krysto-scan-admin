import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/scannedproducts'

const getScannedProducts = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}

const getScannedProduct = async (scannedProductId) => {
  const response = await axios.get(`${API_URL}/${scannedProductId}`)
  return response.data
}

const getUserScannedProducts = async (userId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BASE_API_URL}/users/${userId}/scannedproducts`,
  )
  return response.data
}

const createScannedProductForUser = async (userId, scannedProductData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API_URL}/users/${userId}/scannedproducts`,
    scannedProductData,
  )
  return response.data
}

const updateScannedProduct = async (scannedProductId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/${scannedProductId}`,
    updatedData,
  )
  return response.data
}

const deleteScannedProduct = async (scannedProductId) => {
  const response = await axios.delete(`${API_URL}/${scannedProductId}`)
  return response.data
}

const scannedProductService = {
  getScannedProducts,
  getScannedProduct,
  getUserScannedProducts,
  createScannedProductForUser,
  updateScannedProduct,
  deleteScannedProduct,
}

export default scannedProductService
