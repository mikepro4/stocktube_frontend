import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";
import { Switch } from "@blueprintjs/core";

import Logo from "../logo/index"

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

import MobileNav from "../nav/mobile_nav"
import LoginButtons from "../login_buttons"

class Header extends Component {
 
	render() {

		return (
            <div className={"mobile-menu-container theme-" + this.props.theme}>
                <div className={"app-header theme-" + this.props.theme}>
                    <div className={"app-header-container theme-" + this.props.theme}>
                        <div 
                            className={"app-header-logo theme-" + this.props.theme}
                            onClick={() =>  {
                                this.props.hideMenu()
                                }
                            }
                        >
                            <Logo/>
                        </div>

                        <ul className="app-actions">
                            <li className="action-menu">
                                <Button 
                                    minimal="true"
                                    icon="cross"
                                    className={"control theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        this.props.hideMenu()
                                        }
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <MobileNav />
                <div className={"menu-bottom theme-" + this.props.theme }>
                    <LoginButtons />
                </div>
            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, {
    showMenu,
    hideMenu,
})(Header);
