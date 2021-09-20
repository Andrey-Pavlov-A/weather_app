import React from 'react'
import * as axios from 'axios'
const URL = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=b1509d2f1a6b59ccf919e72402b77cf9'
const APIkey = 'b1509d2f1a6b59ccf919e72402b77cf9'
//const instance = axios.create({
//	withCredentials: true,
//	headers: {
//		"API-KEY": " 3ba5c9081751351d96416ce4094a5a0e"
//	},
//	baseURL: 'http://openweathermap.org/data/2.5/weather'
//})

export const weatherAPI = async (city) => {
	const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
	console.log(response)
	return response
}

export const startCity = async (lat, lon) => {
	const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
	//console.log(response)
	return response
}


//navigator.geolocation.getCurrentPosition(position => {
//			long = position.coords.longtitude
//			lat = position.coords.latitude
//		})
//,{
//		params: {
//			q: values,
//			units: 'metric',
//			APPID: APIkey
//		}
//	}