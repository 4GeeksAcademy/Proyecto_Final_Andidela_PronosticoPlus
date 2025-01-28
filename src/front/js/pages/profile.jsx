import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [weather, setWeather] = useState({})
    const navigate = useNavigate
    useEffect(() => {
        const getData = async () => {
            if(store.currentUser){
                const result_geo = await actions.getGeoData(store.currentUser.city.name)
                if(result_geo){
                    const result_weather = await actions.getCurrentWeather(result_geo[0].lat,result_geo[0].lon)
                    if(result_weather){
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
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Today is: {today}</h5>
                    
                    <h6 className="card-subtitle mb-2 text-body-secondary">{weather.weather && weather?.weather[0].main == "Clouds" && <i className="fa-solid fa-cloud"></i>} </h6> 
                    <h6 className="card-subtitle mb-2 text-body-secondary">Temp: {weather.main && weather.main.temp} °C</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </>
    );
}
