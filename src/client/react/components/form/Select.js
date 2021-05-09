import React from "react";
import classnames from "classnames";

const Select = ({
	input,
	label,
	large,
	type,
	children,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"bp3-large": large,
		"input-valid": touched && !error,
		"input-invalid": touched && error
	});

	return (
		<div className={containerClassName}>
			<div className="input-group-left">
				{label ? <div className="input-label">{label}</div> : ""}
			</div>

			<div className="input-group-right bp3-select">
				<select {...input}>{children}</select>

				{touched && error ? (
					<div className="input-error">
						{touched && error && <span>{error}</span>}
					</div>
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default Select;
