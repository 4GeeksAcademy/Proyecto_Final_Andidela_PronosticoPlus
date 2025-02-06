import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const Hourly = () => {
    const { store, actions } = useContext(Context)
    const { lat, lon } = useParams()
    const [hourlyTemp, setHourlyTemp] = useState({})

    useEffect(() => {
        const getData = async () => {
            if (store.currentUser) {
                const result_hourly_temp = await actions.fetchHourlyWeather(lat, lon)
                if (result_hourly_temp) {
                    setHourlyTemp(result_hourly_temp)
                }
            }
        }
        getData()
    }, [store.currentUser, lat, lon])

    return (
        <>
            <div className="d-flex flex-row gap-1">
                <div class="card cuprum" style={{ width: "18rem" }}>
                    <ul class="list-group list-group-flush">
                        {hourlyTemp && hourlyTemp.length > 0 && hourlyTemp.map((item, index) => {
                            return (
                                <li class="list-group-item">1:00 am
                                    <p>Temp {item.temp}°C</p>
                                    <p>Feels like {item.feels_like}°C</p>
                                    <p>Humidity {item.humidity}%</p>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
