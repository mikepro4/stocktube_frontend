import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Icon, Button, Classes  } from "@blueprintjs/core";

import TabBar from "../../components/tab_bar"
import TabVideos from "./tab_videos"

import qs from "qs";
import * as _ from "lodash"
import { 
    updateQueryString,
    showDrawer
} from "../../../redux/actions/appActions";

class Ticker extends Component {

    state = {
        selectedTabId: "1",
        tabs: [
            "Videos",
            "Posts",
            "Stats",
            "Likes"
        ],
        newCounts: false
    }

    componentDidMount() {
        // this.loadProfile(this.props.match.params.username)
    }

    componentDidUpdate(prevprops, prevparams) {
        // if(prevprops.match.params.username !== this.props.match.params.username) {
        //     this.props.clearProfile()
        //     this.loadProfile(this.props.match.params.username)
        //     this.setState({
        //         newCounts: false
        //     })
        // }

        // if (this.props.location.search) {
		// 	if (prevparams.selectedTabId !== this.getQueryParams().selectedTabId) {
		// 		this.setState({
		// 			selectedTabId: this.getQueryParams().selectedTabId
		// 		});
		// 	}
        // }

        // if(this.props.user && !this.props.followers) {
        //     if(!this.state.newCounts) {
        //         this.updateConnections()
        //     }
        // }

        // if(this.props.user && this.props.loggedInUser && !this.props.connection) {
        //     this.props.getConnection(this.props.loggedInUser._id, this.props.user._id )
        // }

        // if(prevprops.updateCollectionValue !== this.props.updateCollectionValue) {
        //     this.updateConnections()
        // }

    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    componentWillUnmount() {
        // this.props.clearProfile()
    }

    loadProfile(username, update) {
        // this.props.loadProfile(username, () => {
        //     if(update) {
        //         this.updateConnections()
        //     }
        // })
    }
    
    renderHead = () => (
		<Helmet>
			<title>Stocktube - User</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

    updateConnections() {
        // this.setState({
        //     newCounts: true
        // })
        // this.props.getFollowers(this.props.user._id)
        // this.props.getFollowing(this.props.user._id)
        // this.props.getFollowingTickers(this.props.user._id)
    }
    
    getConnection() {
        // this.props.getConnection(this.props.loggedInUser._id, this.props.user._id )
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
                    <TabVideos />
    
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

   
	render() {

        if(!this.props.ticker) {
            return <div>test</div>
        } else {
            return (
                <div className={"ticker-route theme-" + this.props.theme}>
                    <TabBar
                        tabs={this.state.tabs}
                        activeTab={this.state.selectedTabId}
                        onTabChange={(tab) => this.handleTabChange(tab)}
                    />
                   
                   <div id="ticker-tabs">
                       {this.renderTab()}
                   </div>
   
               </div>
           );
        }
	}
}

function mapStateToProps(state) {
	return {
        loggedInUser: state.app.user,
        updateCollectionValue: state.app.updateCollection,
        totalScrolledPixels: state.app.totalScrolledPixels,
        ticker: state.app.ticker
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        updateQueryString,
        showDrawer
	})(Ticker))
}
