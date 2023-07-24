import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const userJSON = window.localStorage.getItem('loggedUser')
const user = JSON.parse(userJSON)

const headers = {
  Authorization: user ? `Bearer ${user.token}` : null,
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const get = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const create = async (newObj) => {
  const res = await axios.post(baseUrl, newObj, { headers })
  return res.data
}

const comment = async (string, id) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, { comment: string })
  return res.data
}

const update = async (updObj, id) => {
  const res = await axios.put(`${baseUrl}/${id}`, updObj, { headers })
  return res.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
  return console.log('deletion successful')
}

export default { getAll, get, create, comment, update, remove }
