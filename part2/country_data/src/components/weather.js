import React from 'react'

const Weather = ({ capital, weather }) => (
    <div>
        <h3>Weather in {capital}</h3>
        <p><b>Temperature:</b> {weather.temperature}°C</p>
        <img src={weather.weather_icons} alt={weather.weather_description} />
        <p><b>Wind:</b> {weather.wind_speed}kmh</p>
    </div>
)

export default Weather