import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import * as _ from "lodash"

import { searchConnectionsFollowers } from "../../../../redux/actions/conectionsActions"
import ListResults  from "../../../components/list"

class Followers extends Component {

    state = {
    }

	render() {
            return (
                <div className={"app-drawer-content-container standard-drawer followers-drawer theme-" + this.props.theme}>
                   
                    <div className={"details-container theme-" + this.props.theme}>
                        <div className="drawer-header">
                            <div className="drawer-title">
                                Followers
                            </div>

                            <Button 
                                minimal="true"
                                icon="cross"
                                className={"control button-close theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.hideDrawer()
                                    }
                                }
                            />

                            {this.props.ticker && <ListResults
                                type="ticker"
                                identifier={this.props.ticker.metadata.symbol}
                                resultType="user-display"
                                searchCollection={this.props.searchConnectionsFollowers}
                            />}

                            {this.props.user && <ListResults
                                type="user"
                                identifier={this.props.user._id}
                                resultType="user-display"
                                searchCollection={this.props.searchConnectionsFollowers}
                            />}
                            
                        </div>
                    </div>
                </div>
    
            )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated
	};
}

export default withRouter(connect(mapStateToProps, {
    searchConnectionsFollowers
})(Followers));
