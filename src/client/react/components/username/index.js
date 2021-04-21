import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter, NavLink, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";
import { Switch } from "@blueprintjs/core";

import Logo from "../logo/index"

import {
    showUsername,
    hideUsername,
    updateUsername
} from '../../../redux/actions/appActions'

import Avatar from "../avatar/index"
import UsernameForm from "./username_form"

class Username extends Component {

    state = {
        loading: false
    }

    handleFormSubmit({ username }) {
        console.log(username)

		this.setState({
			loading: true
        })
        
        this.props.updateUsername(username)
    }
	render() {
		return (
            <div className={"mobile-menu-container username-container theme-" + this.props.theme}>
                <div className={"app-header theme-" + this.props.theme}>
                    <div className={"app-header-container theme-" + this.props.theme}>
                        <div 
                            className={"app-header-logo theme-" + this.props.theme}
                            onClick={() =>  {
                                }
                            }
                        >
                            <Logo/>
                        </div>
                    </div>
                </div>
                <div className={"username-content theme-" + this.props.theme}>
                    <Avatar big={true} user={this.props.user} />

                    <div className="username-title">
                        Select username
                    </div>

                    <div className="username-subtitle">
                        You can always change it later
                    </div>

                    <div className="username-form">

                        <UsernameForm
                            enableReinitialize="true"
                            loading={this.state.loading}
                            onSubmit={this.handleFormSubmit.bind(this)}
                            theme={this.props.theme}
                        />
                    </div>
                </div>
            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated,
        user: state.app.user
	};
}

export default withRouter(connect(mapStateToProps, {
    showUsername,
    hideUsername,
    updateUsername
})(Username));
