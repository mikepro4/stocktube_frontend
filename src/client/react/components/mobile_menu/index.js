import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import Logo from "../logo/index"

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

class Header extends Component {

	render() {

		return (
            <div className={"mobile-menu-container theme-" + this.props.theme}>
                <div className={"app-header theme-" + this.props.theme}>
                    <div className={"app-header-container theme-" + this.props.theme}>
                        <div className={"app-header-logo theme-" + this.props.theme}>
                            <Logo/>
                        </div>

                        <ul className="app-actions">
                            <li className="action-menu">
                                <Button 
                                    minimal="true"
                                    icon="cross"
                                    className={"theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        this.props.hideMenu()
                                        }
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="placeholder">
                    mobile menu content
                </div>
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
    showMenu,
    hideMenu,
})(Header);
