import axios from 'axios'
const API_URL = process.env.REACT_APP_BASE_API_URL + '/auth/me'
const API_URL2 = process.env.REACT_APP_BASE_API_URL + '/users'

const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL2, userData, config)
  return response.data
}

const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(config)
  const response = await axios.get(`${API_URL2}`, config)
  return response.data
}

const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(config)
  const response = await axios.get(`${API_URL2}/${userId}`, config)
  return response.data
}

const getProfil = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}`, config)
  console.log(response)
  return response.data
}

const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.delete(`${API_URL2}/${userId}`, config)
  return response.data
}

const userService = {
  getProfil,
  createUser,
  getUsers,
  deleteUser,
  getUser,
}

export default userService
