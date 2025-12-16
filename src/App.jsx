import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  })

  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
    ];

    const currentDate = new Date();
    const date = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`;

    return date;
  }

  const inputWeather = (event) => {
    if (event.key === 'Enter') {
      setInput('')
      setWeather({...weather, loading: true})
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: input,
          units: "metric",
          appid: "f00c38e0279b7bc85480c3fe775d518c"

        }
      }).then(response => {
        console.log(response)
        setWeather({data: response.data, loading:false, error: false} )
      }).catch(error => {
        console.log(error)
        setWeather({...weather, data: {}, error: true})
      })
    }
  }

  return (
    <div className='app-container'>
      <div className="weather-app">
        <div className="city-search">
          <input type="text" className='city-input'
            placeholder='Enter City Name...'
            value={input}
            onChange={(city) => setInput(city.target.value)}
            onKeyDown={inputWeather}
          />
        </div>
        {
          weather.loading && (
            <div color='green' hieght={70} width={70}></div>
          )
        }
        {
          weather.error && (
            <div className="error-message">
              <span>City Not Found</span>
            </div>
          )
        }
        {
          weather && weather.data && weather.data.main && (
            <div>
              <div className='city-name'>
                <h2>{weather.data.name}, 
                  <span>{weather.data.sys.country}</span>
                </h2>
              </div>

              <div className='date'>
                <span>{toDate()}</span>
              </div>

              <div className="icon-temperature">
                <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} alt="" />
                {Math.round(weather.data.main.temp)}
                <sup className='degree'>C</sup>
              </div>

              <div className="des-wind">
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind Speed: {weather.data.wind.speed}</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default App
