import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import { hideSearch } from "../../../../../redux/actions/appActions"

class ChannelSearchDisplay extends Component {

    componentDidMount() {
      
    }

	render() {

        return (
            <div className="search-channel-display"  onClick={() => { 
                this.props.history.push("/channel/" + this.props.item._id)
                this.props.hideSearch()
            }}>
                <div className="channel-avatar"><img src={this.props.item.metadata.thumbnail}/></div>

                <div className="channel-display-info">
                    <div className="channel-name">{this.props.item.metadata.name}</div>
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
    hideSearch
})(ChannelSearchDisplay));
