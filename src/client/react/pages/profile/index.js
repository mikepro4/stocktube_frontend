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
    getFollowingTickers,
    updateAvatar
} from "../../../redux/actions/profileActions"

import Avatar from "../../components/avatar"

import { Icon, Button, Classes  } from "@blueprintjs/core";

import TabBar from "../../components/tab_bar"
import TabPosts from "./tab_posts"

import qs from "qs";
import * as _ from "lodash"
import { 
    updateQueryString,
    showDrawer
} from "../../../redux/actions/appActions";
import { registerPostInit } from "echarts";

class Profile extends Component {

    state = {
        selectedTabId: "1",
        tabs: [
            "Posts",
            "Tickers",
            "History",
            "Likes"
        ],
        newCounts: false
    }

    componentDidMount() {
        this.loadProfile(this.props.match.params.username)
    }

    componentDidUpdate(prevprops, prevparams) {
        if(prevprops.match.params.username !== this.props.match.params.username) {
            this.props.clearProfile()
            this.loadProfile(this.props.match.params.username)
            this.setState({
                newCounts: false
            })
        }

        if (this.props.location.search) {
			if (prevparams.selectedTabId !== this.getQueryParams().selectedTabId) {
				this.setState({
					selectedTabId: this.getQueryParams().selectedTabId
				});
			}
        }

        if(this.props.user && !this.props.followers) {
            if(!this.state.newCounts) {
                this.updateConnections()
            }
        }

        if(this.props.user && this.props.loggedInUser && !this.props.connection) {
            this.props.getConnection(this.props.loggedInUser._id, this.props.user._id )
        }

        if(prevprops.updateCollectionValue !== this.props.updateCollectionValue) {
            this.updateConnections()
        }

    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    componentWillUnmount() {
        this.props.clearProfile()
    }

    loadProfile(username, update) {
        this.props.loadProfile(username, () => {
            if(update) {
                this.updateConnections()
            }
        })
    }
    
    renderHead = () => (
		<Helmet>
			<title>Stocktube - User</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

    updateConnections() {
        this.setState({
            newCounts: true
        })
        this.props.getFollowers(this.props.user._id)
        this.props.getFollowing(this.props.user._id)
        this.props.getFollowingTickers(this.props.user._id)
    }
    
    getConnection() {
        this.props.getConnection(this.props.loggedInUser._id, this.props.user._id )
    }

    renderButton() {
        if(!this.props.loggedInUser) {
            return (
                <Button 
                    text="Follow"
                    className={"theme-"+ this.props.theme}
                    onClick={() =>  {
                        alert("please sign in")
                        }
                    }
                />
            )
        }
        if(this.props.connection) {
            if(this.props.loggedInUser && (this.props.match.params.username == this.props.loggedInUser.username)) {
                return (
                         <Button 
                                text="Edit profile"
                                minimal="true"
                                className={"outlined theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.showDrawer("edit-profile")
                                    }
                                }
                            />
                )
            } else {
                if(this.props.connection.objectSubject) {
                    return (
                            <Button 
                                    text="Following"
                                    minimal="true"
                                    className={"theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        this.props.deleteConnection(this.props.connection.objectSubject._id, () => {
                                            this.updateConnections()
                                            this.getConnection()
                                        })
                                        }
                                    }
                                />
                    )

                } else {
                    return (
                            <Button 
                                    text="Follow"
                                    className={"theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        this.props.createConnection(this.props.loggedInUser, this.props.user, () => {
                                            this.updateConnections()
                                            this.getConnection()
                                        })
                                        }
                                    }
                                />
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

        if(this.props.totalScrolledPixels > document.getElementById("profile-tabs").offsetTop) {
            console.log(document.getElementById("profile-tabs").offsetTop-30)
            document.getElementById("body").scrollTop = document.getElementById("profile-tabs").offsetTop - 110
        }
        

    };
    
    renderTab = () => {
		switch (this.state.selectedTabId) {
			case "1":
				return(
                    <TabPosts />
    
                    )
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
    
    renderBackground() {
        if(this.props.user && this.props.user.coverGradient) {
            return (
                <div 
                        className={"profile-background gradient-" + this.props.user.coverGradient}
                >
                </div>
            )
        } else {
            return(
                <div 
                    className="profile-background"
                    
                >
                    {this.props.user && (
                        <img src={this.props.user.cover}/>
                    )}
                </div>
            )
        }
    }

   
	render() {

        if(!this.props.user) {
            return <div></div>
        } else {
            return (
                <div className={"profile-route theme-" + this.props.theme}>
                   
                   <div 
                       className="profile-media-container"
                       onClick={(e) =>  {
                               let element = document.elementFromPoint(e.clientX, e.clientY).tagName
                               if (element == "DIV") {
                                   if(this.props.user._id == this.props.loggedInUser._id) {
                                       this.props.showDrawer("cover-select")
                                   }
                               }
                           }
                       }
                   >
                       <div className="profile-avatar">
                           <Avatar 
                               user={this.props.user} 
                               huge={true} 
                               canUpload={this.props.user && this.props.loggedInUser && (this.props.user._id == this.props.loggedInUser._id)}
                               onSuccess={(url) => this.props.updateAvatar(this.props.loggedInUser._id, url)}
                           />
                       </div>
                       
                       {this.renderBackground()}
                   </div>
   
                   <div className="profile-username">
                     {this.props.user && this.props.user.username}  
                   </div>
   
                   {this.props.user && this.props.user.bio && this.props.user.bio.length > 0 ? (
                       <div className="profile-bio">
                           {this.props.user.bio}
                       </div>
                   ) : ""}
   
                   <ul className="counts-container">
                       <li 
                            className="single-count"
                            onClick={() =>  this.props.showDrawer("user-ticker-followubg", { user: this.props.user })}
                        >
                           <div className="count-number">{this.props.followingTickers && this.props.followingTickers.count}</div>
                           <div className="count-label">Tickers</div>
                       </li>
   
                       <li 
                            className="single-count"
                            onClick={() =>  this.props.showDrawer("user-followers", { user: this.props.user })}
                        >
                           <div className="count-number">{this.props.followers && this.props.followers.count}</div>
                           <div className="count-label">Followers</div>
                       </li>
   
                       <li 
                            className="single-count"
                            onClick={() =>  this.props.showDrawer("following-users", { user: this.props.user })}
                        >
                           <div className="count-number">{this.props.following && this.props.following.count}</div>
                           <div className="count-label">Following</div>
                       </li>
                   </ul>

                   <div className="profile-action-button">
                       {this.renderButton()}
                   </div>

                    
                    <TabBar
                        tabs={this.state.tabs}
                        activeTab={this.state.selectedTabId}
                        onTabChange={(tab) => this.handleTabChange(tab)}
                    />
                   
                   <div id="profile-tabs">
                    {this.renderTab()}
                   </div>
   
               </div>
           );
        }
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
        followingTickers: state.profile.followingTickers,
        updateCollectionValue: state.app.updateCollection,
        totalScrolledPixels: state.app.totalScrolledPixels
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
        getFollowingTickers,
        updateAvatar,
        showDrawer
	})(Profile))
}
