import React, { Component } from "react";
import { connect } from "react-redux";
import * as _ from "lodash";
import { Field } from "redux-form";

import Input from "./Input";
import DateInput from "./DateInput";
import Textarea from "./Textarea";
import Checkbox from "./Checkbox";
import Select from "./Select";

class RenderField extends Component {
	renderInput = property => {
		switch (property.propertyType) {
			case "string":
				return (
					<Field
						name={property.propertyName}
						component={Input}
						label={property.label}
						placeholder={property.description}
						ref={property.propertyName}
						icon={property.icon}
						large={property.large}
						small={property.small}
						autoFocus={property.autoFocus}
						minimal={property.minimal}
					/>
				);
			case "protected":
				return (
					<Field
						name={property.propertyName}
						component={Input}
						type="password"
						label={property.label}
						placeholder={property.description}
						ref={property.propertyName}
						icon={property.icon}
						large={property.large}
						small={property.small}
					/>
				);
			case "number":
				return (
					<Field
						name={property.propertyName}
						component={Input}
						type="number"
						label={property.label}
						placeholder={property.description}
						ref={property.propertyName}
						large={property.large}
						small={property.small}
					/>
				);

			case "date":
				return (
					<Field
						name={property.propertyName}
						component={DateInput}
						minDate={new Date("01/01/1100")}
						label={property.label}
						placeholder={property.description}
						ref={property.propertyName}
						large={property.large}
						small={property.small}
					/>
				);
			default:
				return;
		}
	};

	renderField = property => {
		switch (property.fieldType) {
			case "input":
				return this.renderInput(property);
			case "dropdown":
				return (
					<Field
						name={property.propertyName}
						component={Select}
						label={property.label}
						placeholder={property.description}
						ref={property.propertyName}
						large={property.large}
						small={property.small}
					>
						<option />
						{property.dropdownValues.map(value => {
							return (
								<option key={value._id} value={value.valuePropertyName}>
									{value.valueDisplayName}
								</option>
							);
						})}
					</Field>
				);
			case "checkbox":
				return (
					<Field
						name={property.propertyName}
						component={Checkbox}
						type="checkbox"
						label={property.label}
						placeholder={property.description}
						ref={property.propertyName}
						large={property.large}
						small={property.small}
					/>
                );
            case "textarea":
                return (
                    <Field
                        name={property.propertyName}
                        component={Textarea}
                        label={property.label}
                        placeholder={property.description}
                        ref={property.propertyName}
                    />
                );
        default:
				return;
		}
	};

	render() {
		return this.renderField(this.props.property);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { })(RenderField)
