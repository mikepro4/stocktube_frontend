import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import Logo from "../logo/index"
import * as _ from "lodash"

import {
    showMenu,
    hideMenu,
    showDrawer,
    showSearch
} from '../../../redux/actions/appActions'

import Avatar from "../avatar/index"

class Header extends Component {

	render() {

        return (
            <div className={"app-header main-header theme-" + this.props.theme}>
                <div className={"app-header-container theme-" + this.props.theme}>
                    <div className={"app-header-logo theme-" + this.props.theme}>
                        <Logo/>
                    </div>

                    <ul className="app-actions">

                       
                    
                        <li className="action-search">
                            <Button 
                                minimal="true"
                                icon="search"
                                className={"control theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.showSearch()
                                    }
                                }
                            />
                        </li>

                        <li className="action-menu">
                            <Button 
                                minimal="true"
                                icon="menu"
                                className={"control theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.showMenu()
                                    }
                                }
                            />
                        </li>

                        {this.props.user && this.props.authenticated && (
                            <li 
                                className="action-user"
                                onClick={() => {
                                    this.props.showDrawer("user")
                                }}
                            >
                                <Avatar 
                                    small={true} 
                                    user={this.props.user}
                                />
                            </li>
                        )}
                    </ul>
                </div>
            </div>

        )
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, {
    showMenu,
    hideMenu,
    showDrawer,
    showSearch
})(Header);
