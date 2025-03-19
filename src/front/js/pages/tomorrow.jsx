import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const Tomorrow = () => {
    const { store, actions } = useContext(Context)
    const { lat, lon } = useParams()
    const [tomorrowTemp, setTomorrowTemp] = useState({})

    useEffect(() => {
        const getData = async () => {
            if (store.currentUser) {
                const result_tomorrow_temp = await actions.fetchDailyWeather(lat, lon)
                if (result_tomorrow_temp) {
                    setTomorrowTemp(result_tomorrow_temp)
                }
            }
        }
        getData()
    }, [store.currentUser, lat, lon])
    console.log(tomorrowTemp);

    const todayDate = new Date().toLocaleDateString();


    return (
        <>
            <div className="d-flex flex-row gap-1 justify-content-center">
                <div className="card cuprum" style={{ width: "18rem" }}>
                    <ul className="list-group list-group-flush">

                        {tomorrowTemp && tomorrowTemp.length > 0 && tomorrowTemp.map((item, index) => {
                            const forecastDate = new Date(item.dt * 1000).toLocaleDateString(undefined, {
                                weekday: "long",
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                              });
                            return (
                                <li key={index} className="list-group-item">
                                    <h5>{forecastDate}</h5>
                                    <p>Temp {item.temp.day}°C</p>
                                    <h5>Summary: "{item.summary}"</h5>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
