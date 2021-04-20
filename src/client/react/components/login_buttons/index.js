import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes  } from "@blueprintjs/core";

import Logo from "../logo/index"

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

import MobileNav from "../nav/mobile_nav"

class LoginButtons extends Component {
 
	render() {

		return (
            <div className={"login-buttons-container theme-" + this.props.theme}>
                <ul>
                    <li>
                        <Button 
                            text="Login"
                            minimal="true"
                            className={"theme-"+ this.props.theme}
                            onClick={() =>  {
                                this.props.hideMenu()
                                }
                            }
                        />
                    </li>

                    <li>
                        <Button 
                            text="Sign up"
                            className={"theme-"+ this.props.theme}
                            onClick={() =>  {
                                this.props.hideMenu()
                                }
                            }
                        />
                    </li>
                    
                </ul>
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
})(LoginButtons);
