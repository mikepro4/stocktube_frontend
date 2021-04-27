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

import {
    loadTicker,
    getTickerConnection,
    getTickerFollowers,
    clearTicker
} from "../../../redux/actions/tickerActions";

import { 
    resetVideo
} from "../../../redux/actions/playerActions";

import { 
    searchVideos
} from "../../../redux/actions/videosActions";

import YoutubePlayer from "../../components/player/";

import ListResults from "../../components/list"
import classNames from "classnames";

class Ticker extends Component {

    state = {
        selectedTabId: "1",
        tabs: [
            "Videos",
            "Posts",
            "Stats"
        ],
        newCounts: false
    }

    // static loadData(store, match, route, path, query) {
	// 	return store.dispatch(loadTicker(match.params.ticker));
	// }

    componentDidMount() {
        this.props.loadTicker(this.props.match.params.ticker)
        document.getElementById("body").scrollTop = 0
    }

    componentDidUpdate(prevprops, prevparams) {
        if(prevprops.match.params.ticker !== this.props.match.params.ticker) {
            this.props.clearTicker()
            this.loadTicker(this.props.match.params.ticker)
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

        if(this.props.ticker && !this.props.followers) {
            if(!this.state.newCounts) {
                this.updateConnections()
            }
        }

        if(this.props.ticker && this.props.loggedInUser && !this.props.connection) {
            this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol )
        }

        // if(prevprops.updateCollectionValue !== this.props.updateCollectionValue) {
        //     this.updateConnections()
        // }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    componentWillUnmount() {
        this.props.clearTicker()
        this.props.resetVideo()
    }

    loadProfile(symbol, update) {
        this.props.loadTicker(symbol, () => {
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
        this.props.getTickerFollowers(this.props.ticker.metadata.symbol)
    
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

        if(this.props.totalScrolledPixels > document.getElementById("ticker-tabs").offsetTop) {
            document.getElementById("body").scrollTop = document.getElementById("ticker-tabs").offsetTop - 110
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

        return (
            <div className={"ticker-route theme-" + this.props.theme}>


                <div 
                    className={classNames({
                        "ticker-player": true,
                        sticky: this.state.selectedTabId == "1"
                    })}
                >
                    <YoutubePlayer
                        width="375px"
                        height="210px"
                        videoId="fG2cQ-s8j0E"
                    />
                </div>

                <div className="video-bar">
                    {this.props.ticker && <ListResults
                        type="ticker-video-suggestions"
                        identifier={this.props.ticker.metadata.symbol}
                        resultType="video-preview-small"
                        searchCollection={this.props.searchVideos}
                        horizontal={true}
                        height="100px"
                    />}
                    
                </div>

                {this.props.ticker && this.props.ticker.metadata.symbol}

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

function mapStateToProps(state) {
	return {
        loggedInUser: state.app.user,
        updateCollectionValue: state.app.updateCollection,
        totalScrolledPixels: state.app.totalScrolledPixels,
        ticker: state.ticker.ticker,
        followers: state.ticker.followers,
        connection: state.ticker.connection,
        currentVideo: state.player.currentVideo
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        updateQueryString,
        showDrawer,
        loadTicker,
        getTickerConnection,
        getTickerFollowers,
        clearTicker,
        resetVideo,
        searchVideos
	})(Ticker))
}
