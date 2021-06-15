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
  return response.data.sort((a , b) => b.likes - a.likes)
}

const createNew = async params => {
  const config = {
    headers: { Authorization : token }
  }

  const response = await axios.post(baseUrl, params, config)
  return response.data
}

const updateLikes = async blog => {
  const config = {
    headers: {Authorization: token}
  }
  
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user
  }
  
  const response = await axios.put(baseUrl + '/' + blog.id, newBlog, config)
  return response.data
}

const modules = { getAll, setToken, createNew, updateLikes }

export default modules