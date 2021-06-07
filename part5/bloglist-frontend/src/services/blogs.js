import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createNew = async params => {
  const config = {
    headers: { Authorization : token }
  }

  const response = await axios.post(baseUrl, params, config)
  return response.data
}

const modules = { getAll, setToken, createNew }

export default modules