import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"

import NavLinks from "./nav_links"

import ThemeSwitch from "../theme_switch"

class Nav extends Component {

	render() {

        let mobileLinks = [
			{
			  	url: "/",
				name: "Explore",
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
			  	url: "/colelctions",
				name: "Collections",
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

               <ThemeSwitch />

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
})(Nav);
