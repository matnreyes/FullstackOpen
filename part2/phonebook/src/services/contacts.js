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

const deleteContact = contactID => {
    axios.delete(`${url}/${contactID}`)
    return getContacts()
}

export default { getContacts, addContacts, deleteContact }