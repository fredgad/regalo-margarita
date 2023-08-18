import React from 'react'
import axios from 'axios'
import { WeatherResponse } from '../components/weather/WeatherResponse'
import { WeatherForm } from '../components/weather/WeatherForm'
import { Loader } from '../components/common/loader/Loader' 

// const API_KEY = process.env.API_KEY
const API_KEY = '1ae8ab2bca77eec362fdff0bdf3b1877' 
export class Weather extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    weather: undefined,
    temp: undefined,
    feels_like: undefined,
    wind: undefined, 
    gust: undefined, 
    pressure: undefined,
    humidity: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined,
    loading: false
  }

  gettingWeather = async (e) => {
    e.preventDefault()
    let city = e.target.elements.city.value,
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    e.target.elements.city.value = ''
    
    if(city) { 
      this.setState({
        loading: true
      })
      axios(url) 
        .then((response) => { 
          const data = response.data,
          dateSet = new Date(),
          dateRise = new Date()
          dateSet.setTime(data.sys.sunset)
          dateRise.setTime(data.sys.sunrise)

        let sunset = `${dateSet.getHours()}:${dateSet.getMinutes()}:${dateSet.getSeconds()}`,
            sunrise = new Date(data.sys.sunrise).toString()
            // sunrise = `${dateRise.getHours()}:${dateRise.getMinutes()}:${dateRise.getSeconds()}`
            
        this.setState({
          city: data.name,
          country: data.sys.country,
          weather: data.weather[0].description,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          wind: data.main.temp, 
          gust: data.main.temp, 
          pressure: data.main.pressure,
          humidity: data.main.humidity, 
          sunrise: sunrise,
          sunset:  sunset, 
          loading: false,
          error: ''  
        })
      }) 
    }
  }

  render() {
    if(this.state.loading) {
      return (
        <>
          <h2>Find out the weather</h2>
          <WeatherForm weatherMethod={this.gettingWeather} />
          <Loader />
        </>
      )
    } else {
      return (
        <div className="Weather">
          <h2>Find out the weather</h2>
          <WeatherForm weatherMethod={this.gettingWeather} />
          <WeatherResponse
            city={this.state.city}
            weather={this.state.weather}
            country={this.state.country}
            temp={this.state.temp}
            feels_like={this.state.feels_like}
            sunrise={this.state.sunrise}
            pressure={this.state.pressure}
            sunset={this.state.sunset}
            wind={this.state.wind}
            gust={this.state.gust}
            humidity={this.state.humidity} 
            temperror={this.state.temperror} />
        </div>
      )
    }
  }
}
