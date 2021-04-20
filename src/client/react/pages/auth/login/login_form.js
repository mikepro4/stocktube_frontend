import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../../components/form/BladeInput";


class LoginForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
				<div className="auth-form auth-login-form">
					<Form onSubmit={handleSubmit} autoComplete="off">
						<div className="auth-headline transition-element">Login</div>

						<div className="transition-element">
			        <Field
			          name="login"
			          component={Input}
			          placeholder="Username or email"
			          ref="login"
			        />
						</div>

						<div className="transition-element">
			        <Field
			          name="password"
			          component={Input}
			          placeholder="Password"
			          ref="password"
								type="password"
			        />
						</div>

						<div className="login-form-footer transition-element">

							<div className="login-form-forgot-password">
								<Link to="/auth/forgot_password">Forgot password?</Link>
							</div>
						</div>

		        <Button
							disabled={this.props.pristine}
							className={"submit-button transition-element theme-" + this.props.theme}
							loading={this.props.loading}
							type="submit"
							text="Login"
		          large="true"
						/>

						<div className="login-form-footer-text transition-element">
							By logging in, you agree to Blade's <a>Terms of Service</a> and updated <a>Privacy Policy</a>
						</div>
					</Form>
				</div>
		);
	}
}

const validate = values => {
	const errors = {};

	if (!values.login) {
		errors.login = "Username or email is required";
	}

  if (!values.password) {
		errors.password = "Password is required";
	}

	return errors;
};

LoginForm = reduxForm({
	form: "login",
	initialValues: { keepLoggedIn: true },
	validate,
})(LoginForm);

LoginForm = connect(state => {
	return {
	};
})(LoginForm);

export default LoginForm;
