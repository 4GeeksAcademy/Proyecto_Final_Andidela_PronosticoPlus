import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const Hourly = () => {
    const { store, actions } = useContext(Context)
    const { lat, lon } = useParams()
    const [hourlyTemp, setHourlyTemp] = useState({})
    // how to get time from city
    const userTimeZone = localStorage.getItem("userTimeZone") || "UTC";

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

    function convertUnixToReadableTime(unixTimestamp) {
        return new Date(unixTimestamp * 1000).toLocaleString("en-US", {
            timeZone: userTimeZone,
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });
    }

    return (
        <>
            <div className="d-flex flex-row justify-content-center gap-1">
                <div className="card cuprum" style={{ width: "18rem" }}>
                    <ul className="list-group list-group-flush row">

                        {hourlyTemp && hourlyTemp.length > 0 && hourlyTemp.map((item, index) => {
                            return (

                                <li className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <p>Time: {convertUnixToReadableTime(item.dt)}</p>
                                        <p>Temp {item.temp}°C</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p>Feels like {item.feels_like}°C</p>
                                        <p>Humidity {item.humidity}%</p>
                                    </div>


                                </li>

                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
