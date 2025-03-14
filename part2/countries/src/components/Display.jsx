import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Display = ({ filter, data }) => {
  // Filter countries based on the filter input
  const countriesToShow = filter
    ? data.filter(country => country.name.common.toLowerCase().startsWith(filter.toLowerCase()))
    : []

  // State to store the country to display details for
  const [selectedCountry, setSelectedCountry] = useState(null)

  // State to store weather data (temperature and wind speed)
  const [weather, setWeather] = useState(null)

  // Reset selectedCountry when filter changes
  useEffect(() => {
    setSelectedCountry(null) // Reset the selected country when filter changes
    setWeather(null) // Reset weather data when filter changes
  }, [filter])

  // Automatically select the country if there is exactly one match
  useEffect(() => {
    if (countriesToShow.length === 1) {
      setSelectedCountry(countriesToShow[0])
    }
  }, [countriesToShow])

  useEffect(() => {
    if (selectedCountry) {
      const api_key = import.meta.env.VITE_SOME_KEY
      const capital = selectedCountry.capital

      // Make a weather API call
      axios
        .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital}&aqi=no`)
        .then(response => {
          // Set weather data when response is successful
          setWeather({
            temperature: response.data.current.temp_c, // Temperature in Celsius
            windSpeed: response.data.current.wind_kph, // Wind speed in km/h
          })
        })
        .catch(error => {
          console.log(error)
          setWeather(null)
        })
    }
  }, [selectedCountry])

  // Function to handle the "show" button click
  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }

  if (!countriesToShow || countriesToShow.length === 0) {
    return <p>No matches found.</p>
  } else if (countriesToShow.length >= 10) {
    return <p>Too many matches, specify another filter.</p>
  } else if (selectedCountry) {
    // If a country is selected, show the details
    const country = selectedCountry
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital?.[0] || "N/A"}</p>
        <p>Area: {country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="flag" />

        {weather && (
          <div>
            <h3>Weather in {country.capital?.[0]}</h3>
            <p>Temperature: {weather.temperature}°C</p>
            <p>Wind Speed: {weather.windSpeed} km/h</p>
          </div>
        )}
      </>
    )
  }

  // If no country is selected, render a list with a show button
  return (
    <ul>
      {countriesToShow.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => handleShowClick(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default Display
