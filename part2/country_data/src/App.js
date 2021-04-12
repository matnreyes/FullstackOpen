import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Search from './components/search'
import Content from './components/content'

const App = () => {
  const [ query, setQuery ] = useState('')
  const [ queryResult, setQueryResult ] = useState([])
  const [ countryData, setCountryData ] = useState([])
  const [ weatherData, setWeatherData ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  // Pull country data from RestCountries API
  const pullCountryData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryData(response.data)
      })
  }
  useEffect(pullCountryData, [])

  // Pull weather data for capital city from WeatherStackAPI
  const pullWeatherData = (capital) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => { 
        setWeatherData(response.data.current)
      })
  }

  // Handle user search
  const handleQuery = (event) => {
    event.preventDefault()
    const search = event.target.value
    setQuery(search)
    const result = countryData.filter(country => country.name.toUpperCase().includes(search.toUpperCase()))
    if (result.length === 1) {
      pullWeatherData(result[0].capital)
    } 
    setQueryResult(result)
  }

  return (
    <div>
      <Search value={query} handler={handleQuery}/>
      <Content countries={queryResult} buttonAction={handleQuery} weather={weatherData}/>
    </div>
  )
}

export default App;
