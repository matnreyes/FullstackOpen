import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getContacts = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const addContacts = contactObject => {
    const request = axios.post(url, contactObject)
    return request.then(response => response.data)
}

export default { getContacts, addContacts }