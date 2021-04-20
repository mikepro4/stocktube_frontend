import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import socketIOClient from "socket.io-client";

import { FocusStyleManager } from "@blueprintjs/core";

import { io } from "./socket"

FocusStyleManager.onlyShowFocusOnTabs();

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
	}

	render() {
		return (
			<div className="app">
				<div className="app-route-container">
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
		app: state.app
	};
}

export default {
	component: connect(mapStateToProps, {
	})(App)
};