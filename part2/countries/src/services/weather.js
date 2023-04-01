import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const convertCapital = (capital) => {
    const convertUrl =`http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=5&appid=${apiKey}`
    const request = axios.get(convertUrl);
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    const request = axios.get(baseUrl);
    return request.then(response => response.data)
}

export default { convertCapital, getWeather }