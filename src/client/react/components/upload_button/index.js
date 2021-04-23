import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, ProgressBar  } from "@blueprintjs/core";

import * as _ from "lodash"

class UploadButton extends Component {

	render() {
        if(this.props.progress) {
            return (
                <div className="upload-button-progress-bar ">
                    <ProgressBar value={this.props.progress/100}/>
                </div>
            )
        }
        return (
            <div>
                <Button 
                    text="Upload cover image"
                    className={"theme-"+ this.props.theme}
                />
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
})(UploadButton));
