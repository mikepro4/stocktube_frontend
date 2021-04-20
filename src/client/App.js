import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
import keydown from "react-keydown";

import { FocusStyleManager } from "@blueprintjs/core";

import { io } from "./socket"

import { toggleTheme } from "./redux/actions/appActions"

FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"

export let socket

class App extends Component {
	componentDidMount() {
        let socket = io()

		// socket.on('tickerUpdate',(data)=> { 
		// 	this.props.updateTickersSearchResults(data)
		// })

		// socket.on('videoUpdate',(data)=>{ 
		// 	this.props.updateVideosSearchResults(data)
		// })

		const theme = localStorage.getItem('theme');
		if (theme) {
			this.props.toggleTheme(theme)
			document.body.classList.add("theme-" + theme);
		}
	}

	@keydown("ctrl + t")
	toggleTheme() {
		this.props.toggleTheme()
	}

	render() {
		return (
			<div className={"app theme-"+ this.props.theme}>
				<Header />
				<div className={"app-route-container theme-" + this.props.theme}>
					{renderRoutes(this.props.route.routes)}
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer,
		authenticated: state.auth.authenticated,
		theme: state.app.theme
	};
}

export default {
	component: connect(mapStateToProps, {
		toggleTheme
	})(App)
};