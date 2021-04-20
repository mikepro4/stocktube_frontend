import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import {
    showMenu,
    hideMenu
} from '../../../redux/actions/appActions'

class Header extends Component {

	render() {

		return (
            <div>
                <div className={"app-header theme-" + this.props.theme}>
                    <div className={"app-header-left theme-" + this.props.theme}>
                      Logo
                    </div>

                    <div className="app-header-right">
                        <ul className="app-mobile-actions">
                           
                            <li>
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

                            <li>
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
