import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import * as _ from "lodash"

import EditTickerForm from "./edit_ticker_form"

import {updateTicker } from "./../../../../redux/actions/tickerActions"

class EditTicker extends Component {

    state = {
        loading: false,
        progress: null
    }

    handleFormSubmit(values) {
        console.log(values)

		this.setState({
			loading: true
        })

        this.props.updateTicker(this.props.ticker._id, values, () => {
            this.props.hideDrawer()
            this.setState({
                loading: false
            })
        }, () => {
            this.showFailToast("Couldn't save")
            this.setState({
                loading: false
            })
        })
    }

    showFailToast = (message, id) => {
		this.refs.toaster.show({
			message: message,
			intent: Intent.DANGER,
			iconName: "cross"
		});
	};


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
                                initialValues={
                                    {
                                        name: this.props.ticker.metadata.name,
                                        altNames: this.props.ticker.altNames,
                                        strictNameCheck: this.props.ticker.strictNameCheck,
                                        type: this.props.ticker.type,
                                        active: this.props.ticker.active,
                                        special: this.props.ticker.special
                                    }
                                }
                                loading={this.state.loading}
                                onSubmit={this.handleFormSubmit.bind(this)}
                                theme={this.props.theme}
                                originalUsername={this.props.ticker.metadata.symbol}
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
        authenticated: state.auth.authenticated
	};
}

export default withRouter(connect(mapStateToProps, {
    updateTicker
})(EditTicker));
