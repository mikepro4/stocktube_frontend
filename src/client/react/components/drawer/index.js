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
import NewPost from "./type/new_post"
import PostActions from "./type/post_actions"
import TickerActions from "./type/ticker_actions"
import EditTicker from "./type/edit_ticker"
import TickerAvatar from "./type/ticker_avatar"

import Followers from "./type/followers"

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
            case "new-post":
                return (<NewPost hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "edit-post":
                return (<NewPost edit={true} post={this.props.drawerData.post} hideDrawer={() => this.hideDrawer()} enablePortal/>)
            case "post-actions":
                return(<PostActions post={this.props.post} hideDrawer={() => this.hideDrawer()}/>)
            case "ticker-actions":
                return(<TickerActions ticker={this.props.drawerData.ticker} hideDrawer={() => this.hideDrawer()}/>)
            case "edit-ticker":
                return(<EditTicker ticker={this.props.drawerData.ticker} hideDrawer={() => this.hideDrawer()}/>)
            case "upload-ticker-avatar":
                return(<TickerAvatar ticker={this.props.drawerData.ticker} hideDrawer={() => this.hideDrawer()}/>)
            case "followers":
                return(<Followers ticker={this.props.drawerData.ticker} hideDrawer={() => this.hideDrawer()}/>)
            case "user-followers":
                return(<Followers user={this.props.drawerData.user} hideDrawer={() => this.hideDrawer()}/>)
            default:
                return ;
        }
    }

	render() {

        return (
            <div className={"app-drawer theme-" + this.props.theme + " " + classNames({
                "full-screen": this.props.fullScreen
            })}>
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
        authenticated: state.auth.authenticated,
        drawerData: state.app.drawerData
	};
}

export default connect(mapStateToProps, {
    hideDrawer
})(Drawer);
