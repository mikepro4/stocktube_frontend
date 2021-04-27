import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import * as _ from "lodash"

import PostInput from "../../components/post_input"

import ListResults  from "../../components/list"


class TabPosts extends Component {

    render() {
        return (
            <div className={"tab-content tab-videos theme-" + this.props.theme}>
                test
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
})(TabPosts);
