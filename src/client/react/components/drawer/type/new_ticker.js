import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import * as _ from "lodash"

import EditTickerForm from "./edit_ticker_form"

import {updateTicker, createTicker } from "./../../../../redux/actions/tickerActions"

class NewTicker extends Component {

    state = {
        loading: false,
        progress: null
    }

    showFailToast = (message, id) => {
		this.refs.toaster.show({
			message: message,
			intent: Intent.DANGER,
			iconName: "cross"
		});
	};

    createTickerToast = () => {
		this.refs.toaster.show({
			message: "Ticker successully created",
			intent: Intent.PRIMARY
		});
	}

    createTicker = () => {
        // this.props.validateForm("tickerNew")
        if(!this.props.tickerNewForm.syncErrors) {
            this.props.createTicker(
                {
                    metadata: {
                        symbol: this.props.tickerNewForm.values.symbol.toUpperCase(),
                        name: this.props.tickerNewForm.values.name
                    },
                    altNames: this.props.tickerNewForm.values.altNames,
                    strictNameCheck: this.props.tickerNewForm.values.strictNameCheck,
                    type: this.props.tickerNewForm.values.type,
                    active: this.props.tickerNewForm.values.active,
                    special: this.props.tickerNewForm.values.special
                }, (data) => {
                    this.createTickerToast()
                    this.props.history.push("/$" + this.props.tickerNewForm.values.symbol)
                    this.props.hideDrawer()
                })
        }
    }


	render() {
            return (
                <div className={"app-drawer-content-container standard-drawer theme-" + this.props.theme}>
                   
                    <div className={"details-container theme-" + this.props.theme}>
                        <div className="drawer-header">
                            

                            <Button 
                                minimal="true"
                                icon="cross"
                                className={"control button-close theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.hideDrawer()
                                    }
                                }
                            />

                            <EditTickerForm 
                                enableReinitialize="true"
                                loading={this.state.loading}
                                onSubmit={this.createTicker.bind(this)} 
                                theme={this.props.theme}
                            />

                            <Toaster position={Position.TOP_CENTER} ref="toaster" />

                        </div>
                    </div>
                </div>
    
            )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        tickerNewForm: state.form.tickerNew
	};
}

export default withRouter(connect(mapStateToProps, {
    updateTicker,
    createTicker
})(NewTicker));
