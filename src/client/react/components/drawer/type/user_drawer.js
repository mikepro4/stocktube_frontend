import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import {
    hideDrawer
} from '../../../../redux/actions/appActions'


class UserDrawer extends Component {

	render() {

        return (
            <div className={"app-drawer-content-container user-drawer theme-" + this.props.theme}>
                user drawer
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
})(UserDrawer);
