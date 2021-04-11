import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Search from './components/search'
import Content from './components/content'

const App = () => {
  const [ query, setQuery ] = useState('')
  const [ queryResult, setQueryResult ] = useState([])
  const [ countryData, setCountryData ] = useState([])

  // Pull country data from RestCountries API
  const pullData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
      })
  }
  useEffect(pullData, [])

  // Handle user search
  const handleQuery = (event) => {
    event.preventDefault()
    const search = event.target.value
    setQuery(search)
    const result = countryData.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    setQueryResult(result)
  }

  return (
    <div>
      <Search value={query} handler={handleQuery}/>
      <Content countries={queryResult} buttonAction={handleQuery}/>
    </div>
  )
}

export default App;
