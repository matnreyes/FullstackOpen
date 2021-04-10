import React from 'react'

const Content = ({countries}) => (
    <div>
        {countries.map(country => (
            <div key={country.name}>{country.name}</div> 
        ))}
    </div>
)

export default Content
