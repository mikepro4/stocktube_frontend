import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import {
    showDrawer
} from '../../../redux/actions/appActions'

import Avatar from "../../components/avatar"

class PostInput extends Component {

	render() {
        return (
            <div className={"post-input theme-" + this.props.theme} onClick={() => this.props.showDrawer("new-post")}>
                    <Avatar 
                        small={true} 
                        user={this.props.user}
                    />
                    <div className="post-action-container">
                        <span className="post-action-text">Share your opinion...</span>
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
    showDrawer
})(PostInput);
