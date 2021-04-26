import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

class ImageDisplay extends Component {

    state = {
    }

	render() {

        return (
           <div className="image-display">
               {this.props.images && this.props.images.map((image) => {
                   return (
                       <img src={image} />
                   )
               })}
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
})(ImageDisplay);
