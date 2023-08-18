import React from 'react'
import s from './WeatherForm.module.scss'
import search_icon from '../../img/search_icon.png' 
 
export const WeatherForm = props => (
    <form onSubmit={props.weatherMethod} className={s.search}>
        <input type="text" name="city" className="form-control" placeholder="City" />
        <button><img src={search_icon} alt="search"/></button> 
    </form>
)