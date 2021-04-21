import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

class Avatar extends Component {

	render() {
        return (
            <div 
                className={classNames({
                    "avatar-container": true,
                    "default": this.props.user && this.props.user.avatarDefault,
                    "small": this.props.small,
                    "medium": this.props.medium,
                    "big": this.props.big
                })}
            >
                <img src={this.props.user && this.props.user.avatar}/>
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
})(Avatar);
