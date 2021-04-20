import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import LogoDark from "../logo/dark" 
import LogoLight from "../logo/light" 

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

class Header extends Component {

	render() {

		return (
            <div className={"app-header theme-" + this.props.theme}>
                <div className={"app-header-container theme-" + this.props.theme}>
                    <div className={"app-header-logo theme-" + this.props.theme}>
                        {this.props.theme == "light" ? <LogoLight/> : <LogoDark/>}
                    </div>

                    <ul className="app-actions">
                    
                        <li className="action-search">
                            <Button 
                                minimal="true"
                                icon="search"
                                className={"theme-"+ this.props.theme}
                                onClick={() =>  {
                                    console.log("search")
                                    }
                                }
                            />
                        </li>

                        <li className="action-menu">
                            <Button 
                                minimal="true"
                                icon="menu"
                                className={"theme-"+ this.props.theme}
                                onClick={() =>  {
                                    console.log("menu")
                                    }
                                }
                            />
                        </li>
                    </ul>
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
