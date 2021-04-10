import React from 'react'

const Country = ({ country }) => (
    <div>
        <h2>{country.name} ({country.alpha2Code})</h2>
            Capital: {country.capital} <br/>
            Population: {country.population} <br/>
            Region: {country.region}
        <h3>languages</h3>
        <ul>{country.languages.map(language => <li key={language.name}>{language.name}</li>)}</ul>
        <img src={country.flag} alt='{country.name} flag' width='300'/>
    </div>
)

export default Country