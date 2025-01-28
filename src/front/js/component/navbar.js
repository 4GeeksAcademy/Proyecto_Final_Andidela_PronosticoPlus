import React, { useContext } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store } = useContext(Context)
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.currentUser ? 
					<>
					<span>Hello, {store.currentUser.username}</span> 
					<button className="btn btn-primary ms-2">Log out</button>
					</>
					
					:
						<>
							<Link to="/register">
								<button className="btn btn-primary">Register</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-primary ms-2">Log in</button>
							</Link>
						</>

					}

				</div>
			</div>
		</nav>
	);
};
