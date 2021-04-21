import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
import keydown from "react-keydown";

import { FocusStyleManager } from "@blueprintjs/core";

import { io } from "./socket"

import { toggleTheme, assignAvatar } from "./redux/actions/appActions"

FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"
import MobileMenu from "./react/components/mobile_menu"

import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

export let socket

class App extends Component {
	state = {
		appVisible: false
	}
	componentDidMount() {
        let socket = io()

		// socket.on('tickerUpdate',(data)=> { 
		// 	this.props.updateTickersSearchResults(data)
		// })

		// socket.on('videoUpdate',(data)=>{ 
		// 	this.props.updateVideosSearchResults(data)
		// })
		this.auth()

		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.props.fetchCurrentUser(() => {
				this.setState({
					appVisible: true
				})
			})
		} else {
			this.setState({
				appVisible: true
			})
		}

		const theme = localStorage.getItem('theme');
		if (theme) {
			this.props.toggleTheme(theme)
			document.body.classList.add("theme-" + theme);
		} else {
			this.props.toggleTheme("light")
			document.body.classList.add("theme-light");
		}
	}

	componentDidUpdate(prevprops) {
		if(prevprops.user !== this.props.user) {
			if(this.props.user && !this.props.user.avatar) {
				
				this.props.assignAvatar(() => {
					this.props.fetchCurrentUser(() => {
						this.setState({
							appVisible: true
						})
						// location.reload();
					})
				})
				console.log("create avatar")
			}
		}
	}

	auth() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.props.fetchCurrentUser(() => {
				this.setState({
					appVisible: true
				})
			})
		} else {
			this.setState({
				appVisible: true
			})
		}
	}

	@keydown("ctrl + t")
	toggleTheme() {
		this.props.toggleTheme()
	}

	render() {
		if(this.state.appVisible) {
			return (
				<div className={"app theme-"+ this.props.theme}>
					{this.props.menuOpen && <MobileMenu/>}
					<Header />
					<div className={"app-route-container theme-" + this.props.theme}>
						{renderRoutes(this.props.route.routes)}
					</div>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
		
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer,
		authenticated: state.auth.authenticated,
		theme: state.app.theme,
		menuOpen: state.app.menuOpen,
		user: state.app.user
	};
}

export default {
	component: connect(mapStateToProps, {
		toggleTheme,
		authUser, 
		fetchCurrentUser, 
		clearCurrentUser,
		assignAvatar
	})(App)
};