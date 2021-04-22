import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import socketIOClient from "socket.io-client";
import keydown from "react-keydown";

import { FocusStyleManager } from "@blueprintjs/core";

import { io } from "./socket"

import { 
	toggleTheme, 
	assignAvatar,
	showUsername,
	hideUsername,
} from "./redux/actions/appActions"

FocusStyleManager.onlyShowFocusOnTabs();

import Header from "./react/components/header"
import MobileMenu from "./react/components/mobile_menu"
import Username from "./react/components/username"
import Drawer from "./react/components/drawer"
import Scroll from "./react/components/scroll"

import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

export let socket

class App extends Component {
	state = {
		appVisible: false
	}

	componentDidMount() {
        let socket = io()

		this.auth()

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
					this.loadUser()
				})
			}
		}
	}

	auth() {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.authUser()
			this.loadUser()
		} else {
			this.setState({
				appVisible: true
			})
		}
	}

	loadUser() {
		this.props.fetchCurrentUser(() => {
			this.setState({
				appVisible: true
			})

			if(this.props.user && !this.props.user.username) {
				this.props.showUsername()
			} else {
				this.props.hideUsername()
			}
		})
	}

	@keydown("ctrl + t")
	toggleTheme() {
		this.props.toggleTheme()
	}

	render() {
		return (
			<div className={"app theme-"+ this.props.theme}>
				{this.props.menuOpen && <MobileMenu/>}
				{this.props.usernameOpen && <Username />}
				{this.props.drawerOpen && <Drawer type={this.props.drawerType} />}
				<Header />
				<div className={"app-route-container theme-" + this.props.theme}>
					{renderRoutes(this.props.route.routes)}
				</div>
				<Scroll/>
			</div>
		)
	}
}
function mapStateToProps(state) {
	return {
		appReducer: state.appReducer,
		authenticated: state.auth.authenticated,
		theme: state.app.theme,
		menuOpen: state.app.menuOpen,
		usernameOpen: state.app.usernameOpen,
		drawerOpen: state.app.drawerOpen,
		drawerType: state.app.drawerType,
		coverSelectOpen: state.app.coverSelectOpen,
		user: state.app.user
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
		toggleTheme,
		authUser, 
		fetchCurrentUser, 
		clearCurrentUser,
		assignAvatar,
		showUsername,
		hideUsername
	})(App))
};