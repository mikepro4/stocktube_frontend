import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import { hideSearch } from "../../../../../redux/actions/appActions"

class TickerListDisplay extends Component {

    componentDidMount() {
      
    }

    renderTickerAvatar() {

        let content

        if(this.props.item.avatar) {
            content = (<div className="ticker-avatar"><img src={this.props.item.avatar}/></div>)
        } else {
            content = (<div className="ticker-avatar empty"><Icon icon="dollar" size={20}/></div>)
        }
        return(content)
    }

	render() {

        return (
            <div className="search-ticker-display"  onClick={() => { 
                this.props.history.push("/$" + this.props.item.metadata.symbol)
                this.props.hideSearch()
            }}>
                {this.renderTickerAvatar()}

                <div className="ticker-display-info">
                    <div className="ticker-symbol">{this.props.item.metadata.symbol}</div>
                    <div className="ticker-name">{this.props.item.metadata.name}</div>
                </div>

                <div className="ticker-number-of-videos">
                    {this.props.item.last24hours} videos
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
})(TickerListDisplay));
