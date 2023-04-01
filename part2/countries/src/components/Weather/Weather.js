import React from 'react';
import weatherService from '../../services/weather';

function Weather({ country }) {
  const [temperature, setTemperature] = React.useState('');
  const [wind, setWind] = React.useState('');
  const [iconUrl, setIconUrl] = React.useState('');

  weatherService.convertCapital(country.capital).then(response => {
    const lat = response[0].lat;
    const lon = response[0].lon;
    weatherService.getWeather(lat, lon).then(response => {
      setTemperature(response.main.temp);
      setWind(response.wind.speed)
      const id = response.weather.map(i => i.icon)
      const url = `https://openweathermap.org/img/wn/${id.toString()}@2x.png`
      setIconUrl(url)
    })
  })

  return (
    <>
      <h3>Weather in {country.capital}</h3>
      <img alt='weather icon' src={iconUrl}/>
      <p>Temperature: {temperature} Celcius</p>
      <p>Wind: {wind} m/s</p>
    </>
  )
}

export default Weather;
