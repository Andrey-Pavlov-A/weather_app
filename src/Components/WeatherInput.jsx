import React, {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import {weatherAPI, startCity} from '../API/weatherAPI'
import DisplayWeather from './DisplayWeather'
import s from './WeatherInput.module.css'

const WeatherInput = React.memo((props) => {

	const [city, setCity] = useState({ciudad: ''})

	const [weather, setWeather] = useState({data: undefined, icon: undefined})

	const [error, setError] = useState({error: false})

	useEffect(() => {
		//setCity({...city})
		if(city.ciudad === ''){
			navigator.geolocation.getCurrentPosition(position => {
				let lon = position.coords.longitude
				let lat = position.coords.latitude
				console.log(lon, lat)
				return startCity(lat, lon).then(res =>{
					//debugger
					setError({error: false})
					const data = res.data
					const icon = res.data.weather[0].icon
					const urlPic = `http://openweathermap.org/img/w/${icon}.png`
					setWeather({data: data, icon: urlPic})
					let cityName = res.data.name
					setCity({...city, ciudad: cityName})
				})
			})
			
		} else if (city.ciudad !== ''){
			return weatherAPI(city.ciudad).then(res => {
				//debugger
				console.log(res)
				const data = res.data
				setError({error: false})
				const icon = res.data.weather[0].icon
				const urlPic = `http://openweathermap.org/img/w/${icon}.png`
				setWeather({data:data, icon: urlPic})
				console.log(weather.data)
			})
			.catch(error => {
				//debugger
				///alert(error)
				if(error){
					setError({error: true})
				}
			})
		
		}
		
	}, [city.ciudad])
	//console.log(weather.icon)
	//console.log(weather.data)
	//console.log(city)

	const formik = useFormik({
		initialValues: {
			input: ''
		},
		onSubmit: values => {
			setCity({...city, ciudad:values.input})
			values.input = ''
			//console.log(error.error)
		}
	})

//console.log(weather)

	return(
		<div className={s.search} >
			<form className={s.form} onSubmit={formik.handleSubmit} >
				<div className={s.makeCenter}>
					<input className={s.inputField} placeholder='Type city name' onChange={formik.handleChange} value={formik.values.input} name='input'/>
					<button className={s.buttonField} type='submit'>Search</button>
				</div>
				
				{error.error === true ? 'Ooops, the city is not found' : null}
				
			</form>
			{(weather.data !== undefined) && (error.error === false) ? 
				<DisplayWeather data={weather.data} weatherIcon={weather.icon}/> :
				null
			}
		</div>)
})

export default WeatherInput