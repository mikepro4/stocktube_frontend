import React, { Component } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../../components/form/BladeInput";
import Textarea from "../../../components/form/BladeTextarea";

class EditTickerForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
            <Form onSubmit={handleSubmit} autoComplete="off">
                <div className="blade-input-group">
                    <Field
                        name="name"
                        component={Input}
                        placeholder="Type company name..."
                        title="Company name"
                        ref="name"
                    />

                <Button
                    disabled={this.props.pristine}
                    className={"submit-button theme-" + this.props.theme}
                    loading={this.props.loading}
                    type="submit"
                    text="Update"
                    large="true"
                />
                </div>
            </Form>
		);
	}
}

const validate = values => {
    const errors = {}

    return errors
  }

EditTickerForm = reduxForm({
    form: 'editTicker',
    validate
})(EditTickerForm);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
})(EditTickerForm);

  