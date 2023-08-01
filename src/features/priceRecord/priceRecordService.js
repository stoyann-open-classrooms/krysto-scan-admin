import axios from 'axios'

const API_URL = process.env.REACT_APP_BASE_API_URL + '/pricereccords'

const getPriceRecords = async () => {
  const response = await axios.get(`${API_URL}`)
  return response.data
}

const getPriceRecord = async (priceRecordId) => {
  const response = await axios.get(`${API_URL}/${priceRecordId}`)
  return response.data
}

const createPriceRecordForProduct = async (productId, priceRecordData) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BASE_API_URL}/products/${productId}/pricereccords`,
    priceRecordData,
  )
  return response.data
}

const updatePriceRecord = async (priceRecordId, updatedData) => {
  const response = await axios.put(`${API_URL}/${priceRecordId}`, updatedData)
  return response.data
}

const deletePriceRecord = async (priceRecordId) => {
  const response = await axios.delete(`${API_URL}/${priceRecordId}`)
  return response.data
}

const priceRecordService = {
  getPriceRecords,
  getPriceRecord,
  createPriceRecordForProduct,
  updatePriceRecord,
  deletePriceRecord,
}

export default priceRecordService
