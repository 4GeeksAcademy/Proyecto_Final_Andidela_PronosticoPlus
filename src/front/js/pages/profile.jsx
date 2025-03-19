import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [weather, setWeather] = useState({})
    const navigate = useNavigate
    useEffect(() => {
        const getData = async () => {
            if (store.currentUser) {
                const result_geo = await actions.getGeoData(store.currentUser.city.name)
                if (result_geo) {
                    const result_weather = await actions.getCurrentWeather(result_geo[0].lat, result_geo[0].lon)
                    if (result_weather) {
                        setWeather(result_weather)
                    }
                }
            }
        }
        getData()
    }, [store.currentUser])
    const today = new Date().toLocaleDateString();
    return (
        <>
            <div className="card mt-5 mx-auto" style={{ width: "20rem", height: "15rem" }}>
                <div className="card-body cuprum">
                    <h5 className="card-title">Today is: {today}</h5>
                    <h5 className="card-subtitle mb-2 text-body-secondary">Location: {store.currentUser && store.currentUser.city.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {weather.weather && weather?.weather[0].main == "Clouds" && <i className="fa-solid fa-cloud"></i>}
                        {weather.weather && weather?.weather[0].main == "Thunderstorm" && <i class="fa-solid fa-cloud-bolt"></i>}
                        {weather.weather && weather?.weather[0].main == "Drizzle" && <i class="fa-solid fa-droplet"></i>}
                        {weather.weather && weather?.weather[0].main == "Rain" && <i class="fa-solid fa-cloud-showers-heavy"></i>}
                        {weather.weather && weather?.weather[0].main == "Snow" && <i class="fa-solid fa-snowflake"></i>}
                        {weather.weather && weather?.weather[0].main == "Clear" && <i class="fa-regular fa-sun"></i>}
                    </h6>

                    <h6 className="card-subtitle mb-2 text-body-secondary">Temp: {weather.main && weather.main.temp} °C</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Feels like: {weather.main && weather.main.feels_like} °C</h6>
                    <h6 className="card-subtitle mb-2 text-body-secondary">Humidity: {weather.main && weather.main.humidity} %</h6>
                    <Link to={`/hourly/${weather.coord && weather.coord.lat}/${weather.coord && weather.coord.lon}`} className="card-link">Hourly</Link>
                    <Link to={`/tomorrow/${weather.coord && weather.coord.lat}/${weather.coord && weather.coord.lon}`}  className="card-link">8-Day Forecast</Link>
                </div>
            </div>
        </>
    );
}
