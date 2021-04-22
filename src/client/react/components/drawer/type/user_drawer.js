import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"


import Avatar from '../../avatar'

class UserDrawer extends Component {

	render() {
        if(this.props.user) {
            return (
                <div className={"app-drawer-content-container user-drawer theme-" + this.props.theme}>
                    <div className={"user-details-container theme-" + this.props.theme}>
    
                        <div 
                            className="user-details-header"
                        >

                            <div
                                onClick={() => {
                                    this.props.history.push("/@" + this.props.user.username)
                                    this.props.hideDrawer()
                                }}
                            >
                                <Avatar 
                                    user={this.props.user} medium="true" 
                                />
                            </div>
                            
    
                            <div className="user-details">
                                <div className="username">
                                    {this.props.user && this.props.user.username}
                                </div>
                                <div className="email">
                                    {this.props.user && this.props.user.email}
                                </div>
                            </div>
    
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
                                <Link 
                                    to="/watchlists"
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                > <Icon icon="projects" iconSize="20" />Watchlists</Link>
                            </li>
                            <li className="drawer-nav-item">
                                <Link 
                                    to={"/@" + this.props.user.username}
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                ><Icon icon="user" iconSize="20" />My profile</Link>
                            </li>
                            <li className="drawer-nav-item">
                                <Link 
                                    to="/watchlists"
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                ><Icon icon="cog" iconSize="20" />Settings</Link>
                            </li>
                        </ul>
    
                        <div className="drawer-footer">
                            <div className="drawer-footer-left">
                                <Link 
                                    to="/auth/logout"
                                    onClick={() =>  {
                                        this.props.hideDrawer()
                                        }
                                    }
                                >Logout</Link>
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
})(UserDrawer));
