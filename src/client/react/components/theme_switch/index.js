import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import {
    toggleTheme
} from '../../../redux/actions/appActions'

import { Switch } from "@blueprintjs/core";

class ThemeSwitch extends Component {

    handleThemeChange() {
        this.props.toggleTheme()
    }

	render() {
		return (
            <div className="theme-switch">
                <Switch 
                    checked={this.props.theme == "dark"} 
                    label="Dark Theme" 
                    onChange={() => this.handleThemeChange()} 
                />
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme
	};
}

export default connect(mapStateToProps, {
    toggleTheme
})(ThemeSwitch);
