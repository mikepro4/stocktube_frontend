import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

class TickerDisplay extends Component {

    state = {
    }

    selectIcon() {
        if(this.props.ticker.special) {
            return(<div className="ticker-avatar empty"><Icon icon="star" size={20}/></div>)
        } else {
            return(<div className="ticker-avatar empty"><Icon icon="dollar" size={20}/></div>)
        }
    }

    renderTickerAvatar() {

        let content

        if(this.props.ticker.avatar) {
            content = (<div className="ticker-avatar"><img src={this.props.ticker.avatar}/></div>)
        } else {
            content = (this.selectIcon())
        }
        return(content)
    }

	render() {
        if(this.props.ticker) {
            return (
                <div className="ticker-display">
                    {this.renderTickerAvatar()}

                    <div className="ticker-display-info">
                        <div className="ticker-symbol">{this.props.ticker.metadata.symbol}</div>
                        <div className="ticker-name">{this.props.ticker.metadata.name}</div>
                    </div>
                </div>
            ) 
        } else {
            return (
                <div className="ticker-display">
                    
                </div>
            ) 
        }
		
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
})(TickerDisplay);
