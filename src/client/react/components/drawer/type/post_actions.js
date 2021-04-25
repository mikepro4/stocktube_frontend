import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import { showDrawer } from "../../../../redux/actions/appActions"

import Avatar from '../../avatar'

class UserDrawer extends Component {

	render() {
        if(this.props.user) {
            return (
                <div className={"app-drawer-content-container user-drawer post-actions theme-" + this.props.theme}>
                    <div className={"user-details-container theme-" + this.props.theme}>
    
                        <div 
                            className="user-details-header"
                        >

                            <Button 
                                minimal="true"
                                icon="cross"
                                className={"control theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.hideDrawer()
                                    }
                                }
                            />
    
                        </div>
    
                        <ul className="drawer-nav-items">
                            <li className="drawer-nav-item">
                                <a 
                                    onClick={() =>  {
                                        this.props.showDrawer("edit-post")
                                        }
                                    }
                                > <Icon icon="edit" iconSize="20" />Edit post </a>
                            </li>
                            <li className="drawer-nav-item">
                                <a 
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                > <Icon icon="link" iconSize="20" />Copy link </a>
                            </li>
                            <li className="drawer-nav-item">
                                <a 
                                    to={"/@" + this.props.user.username}
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                ><Icon icon="social-media" iconSize="20" />Repost to my wall</a>
                            </li>
                            <li className="drawer-nav-item">
                                <a 
                                    to="/watchlists"
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                ><Icon icon="new-person" iconSize="20" />Follow user</a>
                            </li>
                        </ul>
    
                        <div className="drawer-footer">
                            <div className="drawer-footer-left">
                                <a 
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                >Report</a>
                            </div>
                        </div>
                        
                    </div>
                </div>
    
            )
        } else {
            return (<div/>)
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
    showDrawer
})(UserDrawer));
