import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../components/form/BladeInput";

import { validateUsername } from "../../../redux/actions/appActions"

class UsernameForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
            <Form onSubmit={handleSubmit} autoComplete="off">
                <div className="username-input">
                    <Field
                        name="username"
                        component={Input}
                        placeholder="Type username..."
                        title="Your username"
                        ref="username"
                    />
                </div>

                <Button
                    disabled={this.props.pristine}
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.props.loading}
                    type="submit"
                    text="Continue"
                    large="true"
                />
            </Form>
		);
	}
}

const validate = values => {
    const errors = {}

    if (!values.username) {
      errors.username = 'Please enter username';
    } else if (/[^a-zA-Z0-9]/.test(values.username)) {
        errors.username = 'Invalid username'
      }

    // if (values.username) {
	// 	let containsSpaces = values.username.indexOf(" ") >= 0;
	// 	if (containsSpaces) {
	// 		errors.username = "Can't contain spaces";
	// 	}
    // }

    return errors
  }

UsernameForm = reduxForm({
    form: 'signup',
    validate,
    asyncValidate: validateUsername,
    asyncChangeFields: ["username"],
    asyncBlurFields: ["username"]
})(UsernameForm);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
    validateUsername
})(UsernameForm);

  