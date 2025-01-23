import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Registration = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({
        "username": "",
        "name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "city": "",
        "phone_number": ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData, [name]: value
        }))
    }
    const handleRegister = (e) => {
        e.preventDefault()
        actions.register(data)
    }
    return (
        <div className="container">
            <form onSubmit={handleRegister}>
                <form className="row g-3">
                    <div className="fs-2 d-flex justify-content-center mt-3">Register</div>
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name="email" value={data.email} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" name="password" value={data.password} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={data.username} onChange={handleChange}/>
                    </div>
                    <div className="col-6">
                        <label for="inputAddress" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputAddress" name="name" value={data.name} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputCity" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" value={data.last_name} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputCity" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="city" value={data.city} onChange={handleChange}/>
                    </div>
                    <div className="col-md-6">
                        <label for="inputCity" className="form-label">Phone number</label>
                        <input type="text" className="form-control" id="phone_number" name="phone_number" value={data.phone_number} onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </form>
        </div>
    );
};
