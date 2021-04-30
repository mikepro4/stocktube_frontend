import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"

import Avatar from "../../avatar"

import {
    hideDrawer
} from "../../../../redux/actions/appActions"

class UserDisplay extends Component {
    render() {
        console.log(this.props.item)
        return(
            <div 
                className={classNames({
                    "user-display": true,
                    "small": this.props.small,
                })}
                onClick={() => { 
                    this.props.history.push("/@" + this.props.item.object.username)
                    this.props.hideDrawer()
                }}
            >

                <Avatar user={this.props.item.object} small={true}/>

                <div className="user-display-username">
                    {this.props.item.object.username} 
                </div>
                
                <Icon icon="chevron-right" iconSize={16} />

                
                
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        clientWidth: state.app.clientWidth,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideDrawer
})(UserDisplay));
