import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { 
    loadProfile, 
    clearProfile, 
    getConnection, 
    createConnection, 
    deleteConnection,
    getFollowers,
    getFollowing,
    updateAvatar
} from "../../../redux/actions/profileActions"

import Avatar from "../../components/avatar"

import { Icon, Button, Classes  } from "@blueprintjs/core";

import TabBar from "../../components/tab_bar"

import qs from "qs";
import * as _ from "lodash"
import { updateQueryString } from "../../../redux/actions/appActions";
import { registerPostInit } from "echarts";

class Profile extends Component {

    state = {
        selectedTabId: "1",
        tabs: [
            "Posts",
            "Tickers",
            "History",
            "Likes"
        ]
    }

    componentDidUpdate(prevprops, prevparams) {
        if(!this.props.user && this.props.match.params.username) {
            this.loadProfile(this.props.match.params.username)
        }
        if(prevprops.match.params.username !== this.props.match.params.username) {
            this.loadProfile(this.props.match.params.username)
        }

        if (this.props.location.search) {
			if (prevparams.selectedTabId !== this.getQueryParams().selectedTabId) {
				this.setState({
					selectedTabId: this.getQueryParams().selectedTabId
				});
			}
        }
        if(this.props.user && this.props.loggedInUser  && !this.props.connection) {
            this.updateConnections()
        }

        if(this.props.user) {
            if(this.props.user.username !== this.props.match.params.username) {
                this.loadProfile(this.props.match.params.username)
            } 
        }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    componentWillUnmount() {
        this.props.clearProfile()
    }

    loadProfile(username) {
        this.props.loadProfile(username, () => {
            this.updateConnections()
        })
    }
    
    renderHead = () => (
		<Helmet>
			<title>Stocktube - User</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

    updateConnections() {
        this.props.getConnection(this.props.loggedInUser._id, this.props.user._id )
        this.props.getFollowers(this.props.user._id)
        this.props.getFollowing(this.props.user._id)
    }

    renderButton() {
        if(this.props.connection) {
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
                if(this.props.connection.objectSubject) {
                    return (
                        <div className="profile-action-button">
                            <Button 
                                    text="Following"
                                    minimal="true"
                                    className={"theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        this.props.deleteConnection(this.props.connection.objectSubject._id, () => {
                                            this.updateConnections()
                                        })
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
                                        this.props.createConnection(this.props.loggedInUser, this.props.user, () => {
                                            this.updateConnections()
                                        })
                                        }
                                    }
                                />
                        </div>
                    )
                }
                
            }
        }
        
    }

    handleTabChange = value => {
		this.setState({
			selectedTabId: value
		});

		this.props.updateQueryString(
			{ selectedTabId: value },
			this.props.location,
			this.props.history
		);

    };
    
    renderTab = () => {
		switch (this.state.selectedTabId) {
			case "1":
				return(<div className="placeholder"><div className="demo-post"></div></div>)
			case "2":
				return(
					<div className="placeholder">2</div>
				)
			case "3":
				return(
					<div className="placeholder">3</div>
				)
			case "4":
				return(
					<div className="placeholder">4</div>
				)
			default:
				return ;
		}
	}

   
	render() {

		return (
     		<div className={"profile-route theme-" + this.props.theme}>
                
                <div className="profile-media-container">
                    <div className="profile-avatar">
                        <Avatar 
                            user={this.props.user} 
                            huge={true} 
                            canUpload={true}
                            onSuccess={(url) => this.props.updateAvatar(this.props.loggedInUser._id, url)}
                        />
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
                        <div className="count-number">0</div>
                        <div className="count-label">Tickers</div>
                    </li>

                    <li className="single-count">
                        <div className="count-number">{this.props.followers && this.props.followers.count}</div>
                        <div className="count-label">Followers</div>
                    </li>

                    <li className="single-count">
                        <div className="count-number">{this.props.following && this.props.following.count}</div>
                        <div className="count-label">Following</div>
                    </li>
                </ul>

                {this.renderButton()}

                <TabBar
                    tabs={this.state.tabs}
                    activeTab={this.state.selectedTabId}
                    onTabChange={(tab) => this.handleTabChange(tab)}
                />
                {this.renderTab()}

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
        user: state.profile.user,
        connection: state.profile.connection,
        theme: state.app.theme,
        loggedInUser: state.app.user,
        followers: state.profile.followers,
        following: state.profile.following,
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        loadProfile,
        clearProfile,
        updateQueryString,
        getConnection,
        createConnection,
        deleteConnection,
        getFollowers,
        getFollowing,
        updateAvatar
	})(Profile))
}
