import React, { Component } from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer py-3 text-center">
		<Link to="/">
			<div className="card-footer cuprum">
				WeatherWatch
			</div>
		</Link>

	</footer>
);
