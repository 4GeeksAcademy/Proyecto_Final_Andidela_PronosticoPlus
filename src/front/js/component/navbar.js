import React, { useContext } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const handleLogout = async () => {
		try {
			const success = await actions.logOut();

			if (success) {
				Swal.fire({
					icon: 'success',
					title: 'Cierre de sesión exitoso',
					text: 'Te has desconectado correctamente.',
				}).then(() => {
				});
			} else {
				console.error('No se pudo cerrar sesión.');
			}
		} catch (error) {
			console.error('Error durante el cierre de sesión:', error);
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: 'Ocurrió un error durante el cierre de sesión.',
			});
		}
	};
	return (
		<nav className="navbar my-navbar">
			<div className="container">
				<Link to="/">
					<span style={{ color: '#003285' }} className="navbar-brand mb-0 h1 cuprum">WeatherWatch</span>
				</Link>
				<div className="ml-auto">
					{store.currentUser ?
						
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<span className="cuprum">Hello, {store.currentUser.username}</span>
								</button>
								<ul class="dropdown-menu">
									<li><Link to="/profile">Back to Profile</Link></li>
									<li><Link to="/editProfile">Edit Profile</Link></li>
									<li><a class="dropdown-item" href="#" onClick={handleLogout}>Logout</a></li>
								</ul>
							</div>
							/* <li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									<span className="cuprum">Hello, {store.currentUser.username}</span>
								</a>
								<ul class="dropdown-menu">
									<li><a class="dropdown-item" href="#">Action</a></li>
									<li><a class="dropdown-item" href="#">Another action</a></li>
									<li><hr class="dropdown-divider" /></li>
									<li><a class="dropdown-item" href="#">Something else here</a></li>
								</ul>
							</li>
							<button style={{ backgroundColor: '#2A629A', borderColor: '#2A629A' }} className="btn btn-secondary ms-2 cuprum" type="button" onClick={handleLogout}>Log out</button> */

						:
						<>
							<Link to="/register">
								<button style={{ backgroundColor: '#2A629A', borderColor: '#2A629A' }} className="btn btn-primary cuprum">Register</button>
							</Link>
							<Link to="/login">
								<button style={{ backgroundColor: '#2A629A', borderColor: '#2A629A' }} className="btn btn-primary ms-2 cuprum">Log in</button>
							</Link>
						</>

					}

				</div>
			</div>
		</nav>
	);
};
