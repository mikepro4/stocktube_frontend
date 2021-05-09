import React from "react";
import classnames from "classnames";

const Textarea = ({
	input,
	label,
	placeholder,
	large,
	type,
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
			<div className="input-group-left">
				{label ? <div className="input-label">{label}</div> : ""}
			</div>

			<div className="input-group-right">
				<textarea
					{...input}
					className={inputClassName}
					placeholder={placeholder}
					type={type}
				/>

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

export default Textarea;
