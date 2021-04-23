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
import CoverSelect from "./type/cover_select"
import AvatarSelect from "./type/avatar_select"
import EditProfile from "./type/edit_profile"

class Drawer extends Component {

    state = {
        hide: false
    }

    hideDrawer() {
        this.setState({
            hide: true
        })
        setTimeout(() => {
            this.props.hideDrawer()
        }, 300)
    }

    renderDrawer(type) {
        switch (type) {
            case "user":
                return (<UserDrawer hideDrawer={() => this.hideDrawer()}/>)
            case "cover-select":
                return (<CoverSelect hideDrawer={() => this.hideDrawer()}/>)
            case "avatar-select":
                return (<AvatarSelect hideDrawer={() => this.hideDrawer()}/>)
            case "edit-profile":
                return (<EditProfile hideDrawer={() => this.hideDrawer()}/>)
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
                           this.hideDrawer()
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
