import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import countries from "../json/countries.json"
import { Context } from "../store/appContext";

export const EditProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [data, setData] = useState({
        "username": "",
        "name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "country": "",
        "city": "",
        "phone_number": ""
    })
    const [selectedCountry, setSelectedCountry] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prevData => ({
            ...prevData, [name]: value
        }))
    }
    const handleEditProfile = async (e) => {
        e.preventDefault()
        const result = await actions.editProfile(data)
        if (result) {
            alert(result.msg)
            navigate("/profile")
        } else {
            alert("Failed to edit profile")
        }
    }

    useEffect(()=>{
        setSelectedCountry(countries.find(country => country.name == data.country))
    },[data.country])

    useEffect(()=>{
        if(!store.currentUser) {
            navigate("/login")
        }
        if(store.currentUser) {
            setData({...store.currentUser, country: store.currentUser.city.country.name, city: store.currentUser.city.name})
        }
    },[store.currentUser])
    return store.currentUser && (
        <div className="container">
            <form onSubmit={handleEditProfile}>
                <form className="row g-3 cuprum">
                    <div className="fs-2 d-flex justify-content-center mt-3">Edit Profile</div>
                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name="email" value={data.email} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" name="password" value={data.password} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label for="inputUsername" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={data.username} onChange={handleChange} />
                    </div>
                    <div className="col-6">
                        <label for="inputAddress" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputAddress" name="name" value={data.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <label for="inputCity" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" value={data.last_name} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                        <select value={data.country} onChange={handleChange} name="country" class="form-select" aria-label="Default select example">
                            <option value={0} disabled>Select your country</option>
                            {countries.map((country, index) => {
                                return (
                                    <option key={"country-"+index} value={country.name}>{country.name}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div className="col-md-6">
                        <select value={data.city} onChange={handleChange} name="city" class="form-select" aria-label="Default select example">
                            <option value={0} disabled>Select your city</option>
                            {selectedCountry?.states && selectedCountry?.states.length > 0 && selectedCountry.states.map((city, index) => {
                                return (
                                    <option key={"city-"+index} value={city.name}>{city.name}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div className="col-md-6">
                        <label for="inputCity" className="form-label">Phone number</label>
                        <input type="text" className="form-control" id="phone_number" name="phone_number" value={data.phone_number} onChange={handleChange} />
                    </div>
                    <div className="col-12">
                        <button style={{ backgroundColor: '#2A629A', borderColor: '#2A629A' }} type="submit" className="btn btn-primary">Edit</button>
                    </div>
                </form>
            </form>
        </div>
    );
};
