import React from "react";
import App from "../App";
import Home from "../react/pages/home";

export default [
	{
		...App,
		routes: [
			{	
				component: Home,
				path: "/",
				exact: true,
				params: {
					name: "home"
				},
			}
		]
	}
];