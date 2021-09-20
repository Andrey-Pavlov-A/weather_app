import React from 'react'
import s from './DisplayWeather.module.css'
const DisplayWeather = (props) => {
	//debugger
	return(
		<div className={s.weather}>
			<h2 className={s.cityName}>{props.data.name}, {props.data.sys.country}</h2>
			<img src={props.weatherIcon} />
			<div className={s.weatherDesc} >{props.data.weather[0].description}</div>
			<div>
				<h1 className={s.current_temp_h1}>{Math.round(props.data.main.temp - 273.15)}°</h1>
			</div>
			<div className={s.MinMaxTemp}>
				<div>Min {Math.round(props.data.main.temp_min - 273.15)}°</div> 
				<div>Max {Math.round(props.data.main.temp_max - 273.15)}°</div>
			</div>
		</div>
		)
}

export default DisplayWeather