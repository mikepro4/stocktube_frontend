import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import {
    toggleTheme
} from '../../../redux/actions/appActions'

import { Switch } from "@blueprintjs/core";

import NavLinks from "./nav_links"

class Nav extends Component {

    handleThemeChange() {
        this.props.toggleTheme()
    }

	render() {

        let mobileLinks = [
			{
			  	url: "/",
				name: "Explore",
			},
			{
			  	url: "/trends",
				name: "Trends"
			},
			{
			  	url: "/tickers",
				name: "Tickers",
			},
			{
			  	url: "/videos",
				name: "Videos",
			},
			{
			  	url: "/community",
				name: "Community",
			},
			{
			  	url: "/channels",
				name: "Channels",
			},
			{
			  	url: "/about",
				name: "About",
			}
		]

		return (
			<div className={"nav-container theme-" + this.props.theme}>

                <NavLinks
                    links={mobileLinks}
                />

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
})(Nav);
