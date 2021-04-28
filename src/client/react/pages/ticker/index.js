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
    clearTicker,
    tickerFollow,
    tickerUnfollow
} from "../../../redux/actions/tickerActions";

import { 
    resetVideo,
} from "../../../redux/actions/playerActions";

import TickerDisplay from "../../components/ticker_display";
import classNames from "classnames";

import Avatar from "../../components/avatar"

class Ticker extends Component {

    state = {
        selectedTabId: "1",
        tabs: [
            "Videos",
            "Posts",
            "Stats"
        ],
        newCounts: false,
        connectionLoaded: false
    }

    // static loadData(store, match, route, path, query) {
	// 	return store.dispatch(loadTicker(match.params.ticker));
	// }

    componentDidMount() {
        this.props.loadTicker(this.props.match.params.ticker.toUpperCase())
        document.getElementById("body").scrollTop = 0
    }

    componentDidUpdate(prevprops, prevparams) {
        if(prevprops.match.params.ticker !== this.props.match.params.ticker) {
            this.props.clearTicker()
            this.loadTicker(this.props.match.params.ticker.toUpperCase())
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
            this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol, () => {
                this.setState({
                    connectionLoaded: true
                })
            })
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
        this.props.loadTicker(symbol.toUpperCase(), () => {
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

    getConnection() {
        this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol, () => {
            this.setState({
                connectionLoaded: true
            })
        })
        this.props.getTickerFollowers(this.props.ticker.metadata.symbol)
    }

    renderConnectionArea() {
        if(this.state.connectionLoaded) {
            let buttonText = this.props.connection && this.props.connection.following ? "Following" : "Follow"
            return(
                <div className="ticker-connection-area"> 
                    <Button 
                        text={buttonText}
                        className={"ticker-follow-button theme-"+ this.props.theme + " " + classNames({
                            "following": this.props.connection && this.props.connection.connection ? true : false,
                            "follow": !this.props.connection.connection,
                        })}
                        onClick={() =>  {
                            if(this.props.connection.connection) {
                                this.props.tickerUnfollow(this.props.connection.connection._id, () => {
                                   this.getConnection()
                                }) 
                            } else {
                                this.props.tickerFollow(this.props.ticker.metadata.symbol, () => {
                                    this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol, () => {
                                        this.getConnection()
                                    })
                                })

                            }
                            }
                        }
                    />

                    <div className="featured-followers">
                        {this.props.featuredFollowers && this.props.featuredFollowers.map((follower) => {
                            if(!follower) {
                                return
                            } else {
                                return(
                                    <div key={follower._id} className="single-avatar"><Avatar user={follower.object} mini={true}/></div>
                                )
                            }
                            
                        })}
                    </div>

                    <div 
                        className={classNames({
                            "ticker-followers-count": true,
                            "one": this.props.followers == 1,
                            "two": this.props.followers == 2
                        })}
                    >
                            {this.props.followers} followers
                    </div>
                    
                </div>
            )
        } else {
            return(
                <div className="ticker-connection-area"> </div>
            )
        }
        
    }
   
	render() {

        return (
            <div className={"ticker-route theme-" + this.props.theme}>

                <div className="ticker-header">
                    <TickerDisplay
                        ticker={this.props.ticker}
                    />

                    <div className="ticker-actions">
                        <Button 
                            minimal="true"
                            icon="more"
                            className={"control theme-"+ this.props.theme}
                            onClick={() =>  {
                                this.props.showDrawer("ticker-actions", { ticker: this.props.ticker })
                                }
                            }
                        />
                    </div>
                </div>

                {this.renderConnectionArea()}

                <div className="ticker-chart-area"></div>
                

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
        theme: state.app.theme,
        loggedInUser: state.app.user,
        updateCollectionValue: state.app.updateCollection,
        totalScrolledPixels: state.app.totalScrolledPixels,
        ticker: state.ticker.ticker,
        followers: state.ticker.followers,
        connection: state.ticker.connection,
        featuredFollowers: state.ticker.featuredFollowers,
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
        tickerFollow,
        tickerUnfollow
	})(Ticker))
}
