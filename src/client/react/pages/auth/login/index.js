import React, { Component } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import { Link } from "react-router-dom";
import qs from "qs";
import { Button } from "@blueprintjs/core";

import LoginForm from './login_form'

class Login extends Component {
	state = {
		loading: false
	}

	renderHead = () => (
		<Helmet>
			<title>Blade – Login</title>
			<meta property="og:title" content="Login" />
		</Helmet>
	);

	handleSubmit = values => {
		console.log(values);

		// Fake loading
		this.setState({
			loading: true
		})

		setTimeout(() => {
			this.setState({
				loading: false
			})
		}, 2000)
	}

	render() {
		return (
			<div className={"auth-container theme-" + this.props.theme }>
				<LoginForm
					enableReinitialize="true"
					loading={this.state.loading}
                    onSubmit={this.handleSubmit.bind(this)}
                    theme={this.props.theme}
				/>

				<div className="auth-footer-link">
					<span className="auth-footer-link-label">Need an account?</span>
					<Link to="/auth/signup"><Button minimal="true" className={"small-button theme-" + this.props.theme}>Sign up</Button></Link>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	return {
        router: state.router,
        theme: state.app.theme
	};
}

export default {
	component: connect(mapStateToProps, {})(Login)
}
