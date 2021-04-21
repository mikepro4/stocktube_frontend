import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import {
    hideDrawer
} from '../../../redux/actions/appActions'

import UserDrawer from "./type/user_drawer"

class Drawer extends Component {

    state = {
        hide: false
    }

    renderDrawer(type) {
        switch (type) {
            case "user":
                return (<UserDrawer/>)
            default:
                return ;
        }
    }

	render() {

        return (
            <div className={"app-drawer theme-" + this.props.theme}>
                <div 
                    className={"app-drawer-background theme-" + this.props.theme + " " + classNames({
                        "hide": this.state.hide
                    })}
                    onClick={() =>  {
                            this.setState({
                                hide: true
                            })
                            setTimeout(() => {
                                this.props.hideDrawer()
                            }, 300)
                        }
                    }
                >

                </div>

                <div className={"app-drawer-content theme-" + this.props.theme + " " + classNames({
                        "hide": this.state.hide
                    })}>
                    {this.renderDrawer(this.props.type)}
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
    hideDrawer
})(Drawer);
