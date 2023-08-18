import React from 'react'

export const WeatherResponse = props => {
    return (
        <div style={{marginTop:'20px'}}>
            {props.city && 
            <>
                <h4>{props.city}, {props.country}</h4> 
                <h1>{props.weather.toUpperCase()}</h1>
                <p>Temperature: {props.temp} <sup>C</sup></p>
                {props.fils_like && <p>Fils like: {props.fils_like} <sup>C</sup></p>}
                <p>Pressure: {props.pressure} mm Hg</p>
                <p>Wind: {props.wind}m/s with gusts up to {props.gust}m/s</p>
                <p>Humidity: {props.humidity}%</p>
            </>}
            <p>{props.error}</p>  
        </div>  
    )
}