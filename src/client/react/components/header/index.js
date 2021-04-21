import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import Logo from "../logo/index"
import * as _ from "lodash"

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

class Header extends Component {

	render() {

        return (
            <div className={"app-header main-header theme-" + this.props.theme}>
                <div className={"app-header-container theme-" + this.props.theme}>
                    <div className={"app-header-logo theme-" + this.props.theme}>
                        <Logo/>
                    </div>

                    <ul className="app-actions">

                        {this.props.user && (
                            <div className="avatar-container">
                                <img src={this.props.user.avatar}/>
                            </div>
                        )}
                    
                        <li className="action-search">
                            <Button 
                                minimal="true"
                                icon="search"
                                className={"control theme-"+ this.props.theme}
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
                                className={"control theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.showMenu()
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
        theme: state.app.theme,
        user: state.app.user
	};
}

export default connect(mapStateToProps, {
    showMenu,
    hideMenu,
})(Header);
