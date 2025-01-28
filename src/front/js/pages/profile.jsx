import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
        } else {
            actions.viewProfile()
        }
    }, [])
        const today = new Date().toLocaleDateString();
    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h5 className="card-title">Today is: {today}</h5>
                    {/* <FontAwesomeIcon icon="fa-solid fa-sun-cloud" /> */}
                    <h6 className="card-subtitle mb-2 text-body-secondary">Sunny</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="card-link">Card link</a>
                    <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </>
    );
}
