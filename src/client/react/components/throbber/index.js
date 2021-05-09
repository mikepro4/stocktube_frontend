import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

class Throbber extends Component {

	render() {
        return (
            <div className="throbber-container">
                <div className={"throbber theme-" + this.props.theme + " " + classNames({
                    "regular": true,
                    "small": this.props.small,
                    "big": this.props.big,
                    "huge": this.props.huge,
                })}>
                
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
})(Throbber);
