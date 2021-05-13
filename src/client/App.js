import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import classNames from "classnames";
import keydown from "react-keydown";

import { FocusStyleManager } from "@blueprintjs/core";

import socketIOClient from "socket.io-client";
import { io } from "./socket"

import { createSocketConnectionInstance } from "./services/socketConnection/"

import { 
	join,
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
import Search from "./react/components/search"

import { authUser, fetchCurrentUser, clearCurrentUser } from "../client/redux/actions/authActions"

let socket

class App extends Component {
	state = {
		appVisible: false,
		mediaType: null,
		micStatus: null,
		camStatus: false,
		streaming: null,
		displayStream: null,
	}

	componentDidMount() {
        socket = io()

		this.auth()

		const theme = localStorage.getItem('theme');
		if (theme) {
			this.props.toggleTheme(theme)
			document.body.classList.add("theme-" + theme);
		} else {
			this.props.toggleTheme("light")
			document.body.classList.add("theme-light");
		}

		this.startConnection()

		// socket.on('connect', () => {
        //     console.log('socket connected');
        // });


		// window.navigator.mediaDevices.getUserMedia({
		// 	video: true,
		// 	audio: true,
		//   })
		// .then(() => {
		// });
	}

	disconnect() {
		socket.current.destoryConnection();
	}

	startConnection = () => {
		this.props.join((id) => {
			console.log(id)
			let params;
			if (!params) params = {quality: 12, id: id}
			socket.current = createSocketConnectionInstance({
				updateInstance: this.updateFromInstance,
				params
			});
		})
		
        
    }

	updateFromInstance = (key, value) => {
        if (key === 'streaming') {
			this.setState({
				streaming: value
			})
		};
        if (key === 'displayStream') {
			this.setState({
				displayStream: value
			})
		};
    }

	// handleMyMic = () => {
    //     const { getMyVideo, reInitializeStream } = socket.current;
    //     const myVideo = getMyVideo();
    //     if (myVideo) myVideo.srcObject?.getAudioTracks().forEach((track:any) => {
    //         if (track.kind === 'audio')
    //             // track.enabled = !micStatus;
    //             micStatus ? track.stop() : reInitializeStream(camStatus, !micStatus);
    //     });
    //     setMicStatus(!micStatus);
    // }

    // handleMyCam = () => {
    //     if (!displayStream) {
    //         const { toggleVideoTrack } = socketInstance.current;
    //         toggleVideoTrack({ video: !camStatus, audio: micStatus });
    //         setCamStatus(!camStatus);
    //     }
    // }

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

	// reInitializeStream(false, true, displayStream).then(() => {
	// 	setMediaType(!mediaType)
	// });

	toggleScreenShare = () => {
        const { reInitializeStream, toggleVideoTrack } = socket.current;
        this.state.displayStream && toggleVideoTrack({video: false, audio: true});
        reInitializeStream(false, true, !this.state.displayStream ? 'displayMedia' : 'userMedia').then(() => {
			this.setState({
				displayStream: null,
				camStatus: false
			})
        });
    }
	
	render() {
		return (
			<div className={"app theme-"+ this.props.theme}>

				<button 
					onClick={() => this.startConnection()}
				>
				{this.state.displayStream ? 'Stop Screen Share' : 'Share Screen'}</button>

				<div id="room-container"></div>

				{this.props.menuOpen && <MobileMenu/>}
				{this.props.usernameOpen && <Username />}
				{this.props.drawerOpen && <Drawer type={this.props.drawerType} />}
				{this.props.searchOpen && <Search />}
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
		user: state.app.user,
		searchOpen: state.app.searchOpen
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
		hideUsername,
		join
	})(App))
};