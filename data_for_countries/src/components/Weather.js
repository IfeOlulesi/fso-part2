import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const countryName = country.name
  const [response, setResponse] = useState("")

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: countryName
    }

    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setResponse(response.data)
      }).catch(error => console.log(error))
  }, []);

  return (
    <React.Fragment>
      {response 
        ? <React.Fragment>
          <h2>Weather in {countryName}({response.location.name})</h2>
            <p>Temperature: {response.current.temperature}℃</p>
            <img src={response.current.weather_icons[0]}/>
            <p>
              Wind: {response.current.wind_speed} mph <br />
              Direction: {response.current.wind_dir}
            </p>
          </React.Fragment>
        : <React.Fragment>Fetching data</React.Fragment>
      }
    </React.Fragment>
  )
}

export default Weather;