import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"

import Avatar from "../../../avatar"

import {
    hideSearch
} from "../../../../../redux/actions/appActions"

class UserDisplay extends Component {
    render() {
        console.log(this.props.item)

        let user = this.props.item

        return(
            <div 
                className={classNames({
                    "search-user-display": true,
                    "search-format": true,
                })}
                onClick={() => { 
                    this.props.history.push("/@" + user.username)
                    this.props.hideSearch()
                }}
            >

                <Avatar user={user} small={true}/>

                <div className="user-display-username">
                    {user.username} 
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
        clientWidth: state.app.clientWidth,
    };
}

export default withRouter(connect(mapStateToProps, {
    hideSearch
})(UserDisplay));
