import axios from "axios";

const API_KEY = 'f73f0b225339486d9d9fac60ddb67b2f';

export const instance = axios.create({
    baseURL: 'https://api.weatherbit.io/v2.0',
    headers: {},
});

export const weatherAPI = {
    async currentWeather(lat, long) {
        return await instance.get(`/current?key=${API_KEY}&lat=${lat}&lon=${long}`);
    },

    async currentWeatherLocation(city) {
        return await instance.get(`/current?key=${API_KEY}&city=${city}`);
    },

    async dailyWeather(lat, long) {
        return await instance.get(`/forecast/daily?key=${API_KEY}&lat=${lat}&lon=${long}`);
    },

    async dailyWeatherLocation(city) {
        return await instance.get(`/forecast/daily?key=${API_KEY}&city=${city}`);
    },
}