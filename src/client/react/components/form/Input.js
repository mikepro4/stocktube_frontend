import React from "react";
import classnames from "classnames";
import {Intent, InputGroup } from "@blueprintjs/core";

const Input = ({
	input,
	label,
	placeholder,
	icon,
	type,
	large,
	small,
	right,
	autoFocus,
	rounded,
	meta: { touched, error }
}) => {
	let containerClassName = classnames({
		"input-group": true,
		"input-valid": touched && !error,
		"input-invalid": touched && error,
		"rounded": rounded
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
				<InputGroup
					{...input}
					leftIcon={icon}
					type={type}
					intent={touched && error ? Intent.DANGER : Intent.NONE}
					placeholder={placeholder}
					large={large}
					small={small}
					autoComplete="new-password"
					rightElement={right}
					autoFocus={autoFocus ? true : false}
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

export default Input;
