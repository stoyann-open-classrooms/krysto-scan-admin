import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/productCategories'

const getProductCategories = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}
const getProductCategory = async (productCategoryId) => {
  const response = await axios.get(`${API_URL}/${productCategoryId}`)
  return response.data
}
const createProductCategory = async (productCategoryData) => {
  const response = await axios.post(API_URL, productCategoryData)
  return response.data
}
const updateProductCategory = async (productCategoryId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/${productCategoryId}`,
    updatedData,
  )
  return response.data
}
const addProductCategoryPhoto = async (productCategoryId, photoData) => {
  const response = await axios.put(
    `${API_URL}/${productCategoryId}/photo`,
    photoData,
  )
  return response.data
}

const productCategoryService = {
  getProductCategories,
  getProductCategory,
  createProductCategory,
  updateProductCategory,
  addProductCategoryPhoto,
}

export default productCategoryService
