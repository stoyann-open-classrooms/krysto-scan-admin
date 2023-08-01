import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL
const productURL = '/products'

const getProducts = async () => {
  const response = await axios.get(`${API_URL}${productURL}`)
  return response.data
}

const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}${productURL}/${productId}`)
  return response.data
}

const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}${productURL}`, productData)
  return response.data
}

const updateProduct = async (productId, updatedData) => {
  const response = await axios.put(
    `${API_URL}${productURL}/${productId}`,
    updatedData,
  )
  return response.data
}

const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}${productURL}/${productId}`)
  return response.data
}

const addProductPhoto = async (productId, photo) => {
  console.log(photo)
  const response = await axios.put(
    `${API_URL}${productURL}/${productId}/photo`,
    photo,
  )
  return response.data
}

const recyclableProductService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductPhoto,
}

export default recyclableProductService
