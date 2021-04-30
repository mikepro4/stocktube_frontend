import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import { hideDrawer } from "../../../../redux/actions/appActions"
import { loadTickerToState } from "../../../../redux/actions/tickerActions"

class TickerListDisplay extends Component {

    state = {
        ticker: null
    }

    componentDidMount() {
        this.props.loadTickerToState(this.props.item.subject.symbol, (ticker) => {
            console.log(ticker)
            this.setState({
                ticker
            })
        })
    }

    renderTickerAvatar() {

        let content

        if(this.state.ticker.avatar) {
            content = (<div className="ticker-avatar"><img src={this.state.ticker.avatar}/></div>)
        } else {
            content = (<div className="ticker-avatar empty"><Icon icon="dollar" size={20}/></div>)
        }
        return(content)
    }

	render() {

        if(this.state.ticker) {
            return (
                <div className="ticker-display"  onClick={() => { 
                    this.props.history.push("/$" + this.state.ticker.metadata.symbol)
                    this.props.hideDrawer()
                }}>
                    {this.renderTickerAvatar()}

                    <div className="ticker-display-info">
                        <div className="ticker-symbol">{this.state.ticker.metadata.symbol}</div>
                        <div className="ticker-name">{this.state.ticker.metadata.name}</div>
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

export default withRouter(connect(mapStateToProps, {
    loadTickerToState,
    hideDrawer
})(TickerListDisplay));
