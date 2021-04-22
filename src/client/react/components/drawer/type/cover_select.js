import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

class CoverSelect extends Component {

	render() {
            return (
                <div className={"app-drawer-content-container cover-select-drawer theme-" + this.props.theme}>
                   
                    <div className={"user-details-container theme-" + this.props.theme}>
                        cover select
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

export default withRouter(connect(mapStateToProps, {
})(CoverSelect));
