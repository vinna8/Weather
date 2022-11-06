import { weatherAPI } from "../api/api";
import { GET_CURRENT_WEATHER, GET_DAILY_WEATHER } from "./types";

export const setCurrentWeather = (weatherCurrent) => {
    return {
        type: GET_CURRENT_WEATHER,
        data: {weatherCurrent}
    };
}

export const setDailyWeather = (weatherDaily) => {
    return {
        type: GET_DAILY_WEATHER,
        data: {weatherDaily}
    };
}

export const currentWeather = (lat, long) => {
    return (dispatch) => {
        weatherAPI.currentWeather(lat, long)
        .then(response => {
                console.log(response)
                let weatherCurrent = response.data.data[0];
                dispatch(setCurrentWeather(weatherCurrent));
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

export const currentWeatherLocation = (city) => {
    return (dispatch) => {
        weatherAPI.currentWeatherLocation(city)
        .then(response => {
                console.log(response)
                let weatherCurrent = response.data.data[0];
                dispatch(setCurrentWeather(weatherCurrent));
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

export const dailyWeather = (lat, long) => {
    return (dispatch) => {
        weatherAPI.dailyWeather(lat, long)
        .then(response => {
                console.log(response)
                let weatherDaily = response.data.data;
                dispatch(setDailyWeather(weatherDaily));
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}

export const dailyWeatherLocation = (city) => {
    return (dispatch) => {
        weatherAPI.dailyWeatherLocation(city)
        .then(response => {
                console.log(response)
                let weatherDaily = response.data.data;
                dispatch(setDailyWeather(weatherDaily));
            }
        )
        .catch(error => {
            console.log(error)
        })
    }
}