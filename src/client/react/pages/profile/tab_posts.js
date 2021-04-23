import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import * as _ from "lodash"

import PostInput from "../../components/post_input"

class TabPosts extends Component {

    render() {

        return (
            <div className={"tab-content tab-posts theme-" + this.props.theme}>
                <div className="placeholder">
                    {this.props.user && this.props.profileUser && this.props.user._id == this.props.profileUser._id && <PostInput />}
                </div>
            </div>

        )

    }
}


function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        profileUser: state.profile.user,
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps, {
})(TabPosts);
