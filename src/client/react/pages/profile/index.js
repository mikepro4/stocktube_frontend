import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { loadProfile, clearProfile } from "../../../redux/actions/profileActions"

import Avatar from "../../components/avatar"

import { Icon, Button, Classes  } from "@blueprintjs/core";

class Profile extends Component {

    constructor(props){
		super(props)
		this.state = {
		}
    }
    
    static loadData(store, match) {
        if(match.params.username) {
            return store.dispatch(loadProfile(match.params.username));
        }        
	}

	componentDidMount() {
	}

    componentDidUpdate(prevprops, prevparams) {
        if(!this.props.user && this.props.match.params.username) {
            this.loadProfile(this.props.match.params.username)
        }
        if(prevprops.match.params.username !== this.props.match.params.username) {
            this.loadProfile(this.props.match.params.username)
        }
    }

    componentWillUnmount() {
        this.props.clearProfile()
    }

    loadProfile(username) {
        this.props.loadProfile(username)
    }
    
    renderHead = () => (
		<Helmet>
			<title>Stocktube - User</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

    renderButton() {
        if(this.props.loggedInUser && (this.props.match.params.username == this.props.loggedInUser.username)) {
            return (
                <div className="profile-action-button">
                     <Button 
                            text="Edit profile"
                            minimal="true"
                            className={"outlined theme-"+ this.props.theme}
                            onClick={() =>  {
                                }
                            }
                        />
                </div>
            )
        } else {
            return (
                <div className="profile-action-button">
                    <Button 
                            text="Follow"
                            className={"theme-"+ this.props.theme}
                            onClick={() =>  {
                                }
                            }
                        />
                </div>
            )
        }
    }

	render() {

		return (
     		<div className={"profile-route theme-" + this.props.theme}>
                
                <div className="profile-media-container">
                    <div className="profile-avatar">
                        <Avatar user={this.props.user} huge={true} />
                    </div>
                    <div className="profile-background">
                    </div>
                </div>

                <div className="profile-username">
                  {this.props.user && this.props.user.username}  
                </div>

                {this.props.user && this.props.user.bio ? (
                    <div className="profile-username">
                        {this.props.user.bio}
                    </div>
                ) : ""}

                <ul className="counts-container">
                    <li className="single-count">
                        <div className="count-number">0%</div>
                        <div className="count-label">Accuracy</div>
                    </li>

                    <li className="single-count">
                        <div className="count-number">5,450</div>
                        <div className="count-label">Followers</div>
                    </li>

                    <li className="single-count">
                        <div className="count-number">100</div>
                        <div className="count-label">Following</div>
                    </li>
                </ul>

                {this.renderButton()}

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
        user: state.profile.user,
        theme: state.app.theme,
        loggedInUser: state.app.user
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        loadProfile,
        clearProfile
	})(Profile))
}
