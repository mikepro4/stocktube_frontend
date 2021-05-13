import React, { Component } from "react";
import { Field, FieldArray, reduxForm, formValueSelector } from "redux-form";
import classnames from "classnames";
import { Form } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Intent, Spinner } from "@blueprintjs/core";

import Input from "../../../components/form/BladeInput";
import Textarea from "../../../components/form/BladeTextarea";
import RenderField from "../../../components/form/RenderField";

import {
	validateSymbol
} from '../../../../redux/actions/tickerActions'

class EditTickerForm extends Component {
	render() {
		const { handleSubmit } = this.props;

		return (
            <Form onSubmit={handleSubmit} autoComplete="off">
                <div className="blade-input-group">
                    <Field
                        name="symbol"
                        component={Input}
                        placeholder="Type symbol..."
                        title="Symbol"
                    />

                
                </div>
                <div className="blade-input-group">
                    <Field
                        name="name"
                        component={Input}
                        placeholder="Type company name..."
                        title="Company name"
                    />

                
                </div>
                <div className="blade-input-group">
                    <FieldArray name="altNames" component={({ fields, meta: { touched, error } }) => (
                        <ul>
                       
                            {fields.map((altName, index) =>
                                <li key={index}>

                                    <Button 
                                        minimal="true"
                                        icon="trash"
                                        className={"control remove-item theme-"+ this.props.theme}
                                        onClick={() =>  {
                                            fields.remove(index)
                                            }
                                        }
                                    />
                                    <Field
                                        name={altName}
                                        component={Input}
                                        type="text"
                                        label="Name"
                                        title={"Name #" + (index + 1)}
                                        placeholder="Add alt name..."
                                    />
                                </li>
                            )}

                            <li>
                                <Button 
                                    minimal="true"
                                    icon="plus"
                                    text="Add alt name"
                                    className={"control  theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        fields.push()
                                        }
                                    }
                                />
                                {touched && error && <span>{error}</span>}
                            </li>
                        </ul>
                    )}/>
                </div>

                <div className="blade-input-group">
                    <RenderField 
                        property={
                            {
                                propertyName: "strictNameCheck",
                                fieldType: "checkbox",
                                label: "Stict name check",
                            }
                        } 
                        />
                </div>

                <div className="blade-input-group">
                    <RenderField 
                        property={
                            {
                                propertyName: "type",
                                fieldType: "dropdown",
                                label: "Asset Type",
                                dropdownValues: [
                                    {
                                        _id: 1,
                                        valuePropertyName: "regular",
                                        valueDisplayName: "NYSE / NASDAQ"
                                    },
                                    {
                                        _id: 2,
                                        valuePropertyName: "crypto",
                                        valueDisplayName: "Crypto"
                                    },
                                    {
                                        _id: 3,
                                        valuePropertyName: "otc",
                                        valueDisplayName: "OTC"
                                    }
                                ]
                            }
                        } 
                        />
                </div>

                <div className="blade-input-group">
                    <RenderField 
                        property={
                            {
                                propertyName: "active",
                                fieldType: "checkbox",
                                label: "Active",
                            }
                        } 
                        />
                </div>

                <div className="blade-input-group">
                    <RenderField 
                        property={
                            {
                                propertyName: "special",
                                fieldType: "checkbox",
                                label: "Special",
                            }
                        } 
                        />
                </div>

                <div className="blade-input-group">
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

    if (!values.symbol) {
        errors.symbol = 'Please enter a symbol';
    }

    if (values.symbol) {
      let containsSpaces = values.symbol.indexOf(" ") >= 0;
      if (containsSpaces) {
        errors.symbol = "Can't contain spaces";
      }
    }

    return errors
}

export default reduxForm({
    form: 'tickerNew',
    validate,
    asyncValidate: validateSymbol,
    asyncBlurFields: ["symbol"]
})(EditTickerForm);
  