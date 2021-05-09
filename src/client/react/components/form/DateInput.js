import React, { Probp3ypes } from "react";
import classnames from "classnames";
import { DateInput } from "@blueprintjs/datetime";
import { Position } from "@blueprintjs/core";

const Date = ({
	input,
	label,
	placeholder,
	icon,
	large,
	type,
	minDate,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"bp3-large": large,
		"input-valid": touched && !error,
		"input-invalid": touched && error
	});

	let inputClassName = classnames({
		"bp3-input": true,
		"bp3-intent-success": touched && !error,
		"bp3-intent-danger": touched && error
	});

	return (
		<div className={containerClassName}>
			{label ? (
				<div className="input-group-left">
					<div className="input-label">{label}</div>
				</div>
			) : (
				""
			)}

			<div className="input-group-right">
				<DateInput
					popoverPosition={Position.TOP}
					inline={false}
					minDate={minDate}
					{...input}
					className={inputClassName}
					type={type}
				/>

				{touched && error ? (
					<div className="input-error">
						{touched && error && <span>{error}</span>}
					</div>
				) : (
					""
				)}

				{touched && !error ? (
					<div className="input-valid">
						<span className="bp3-icon bp3-icon-small-tick" />
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Date;
