import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Icon, Button, Classes  } from "@blueprintjs/core";

import qs from "qs";

import moment from 'moment'
import * as _ from "lodash"
import { 
    updateQueryString,
    showDrawer
} from "../../../redux/actions/appActions";

import {
    preloadVideo,
    loadVideo,
    clearVideo
} from "../../../redux/actions/videosActions";

import { 
    updateCurrentVideo,
} from "../../../redux/actions/playerActions";

import YoutubePlayer from "../../components/player/";

import {updateLocale } from "moment"

import {
    searchTrending
} from '../../../redux/actions/trendingActions'

import ListResults from "../../components/list"

import { 
    searchVideos
} from "../../../redux/actions/videosActions";


class Video extends Component {

    state = {
    }

    static loadData(store, match, route, path, query) {
		return store.dispatch(loadVideo(match.params.video));
	}

    componentDidMount() {
        document.getElementById("body").scrollTop = 0
        if(this.props.preloadVideoValue.googleId == this.props.match.params.video) {
            this.preloadVideo(this.props.preloadVideoValue)
        } else {
            this.loadVideo(this.props.match.params.video)
        }
    }

    componentDidUpdate(prevprops, prevparams) {
       if(this.props.currentVideo.videoId !== this.props.match.params.video) {
            if(this.props.preloadVideoValue.googleId == this.props.match.params.video) {
                this.preloadVideo(this.props.preloadVideoValue)
                document.getElementById("body").scrollTop = 0
            }
       }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    componentWillUnmount() {
        this.props.clearVideo()
        this.props.updateCurrentVideo()
    }

    loadVideo(id, update) {
        this.props.loadVideo(id, () => {
            console.log("loaded")
            this.playVideo()
            
        })
    }

    preloadVideo(video) {
        this.props.preloadVideo(video, () => {
            console.log("preloaded")
            this.playVideo()
        })
    }

    playVideo() {
        if(this.props.video) {
            this.props.updateCurrentVideo(this.props.video.metadata.id, "play", 0, this.props.video)
        }
    }
     
    renderHead = () => (
		<Helmet>
			<title>Ticker - Video</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

    getVideoTime() {
        let date =  moment(this.props.video.createdAt).startOf('hour').fromNow( updateLocale("en", {
            relativeTime: {
              future: "in %s",
              past: "%s ",
              s: "sec",
              m: "%d m",
              mm: "%d m",
              h: "%d h",
              hh: "%d h",
              d: "%d d",
              dd: "%d d",
              M: "a mth",
              MM: "%d mths",
              y: "y",
              yy: "%d y"
            }
        }))

        return(date.replace(/\s/g, ''))
    }

    getHeight() {
        if(this.props.clientWidth < 900) {
            return Math.round((this.props.clientWidth/16)*9)
        }

        if(this.props.clientWidth >= 900) {
            return Math.round((this.props.clientHeight*0.8))
        }
    }

    getLinkedTickerLists() {
        if(this.props.video) {
            console.log(this.props.video.linkedTickers)

            return(
                <div>
                    {this.props.video.linkedTickers.map(ticker => {
                        return (<div key={ticker._id} className="suggested-group">
                            <Link to={"/$" + ticker.symbol} className="ticker-name">${ticker.symbol}</Link>
                            <ListResults
                                type="ticker-video-suggestions"
                                identifier={ticker.symbol}
                                resultType="video-preview-vertical"
                                searchCollection={this.props.searchVideos}
                                horizontal={true}
                                limit={10}
                            /></div>)
                        }
                    )}
                </div>
            )
        }
    }
   
	render() {
        if(this.props.clientWidth && this.props.video) {

            return (
                <div className={"video-route theme-" + this.props.theme}>
                    {this.renderHead()}
                    <div 
                        className="video-area"
                        style={{
                            height: this.getHeight()
                        }}
                    >
                        {this.props.video && <YoutubePlayer
                            width="100%"
                            height="100%"
                            videoId="fG2cQ-s8j0E"
                        />}
                    </div>
                    

                    {this.props.video && <div className="video-details main">
                        <div className="channel-name">{this.props.video.metadata.channel.name} 
                            <span className="video-name-divider">●</span> 
                            <span className="video-time">{this.getVideoTime()}</span>
                        </div>
                        <div className="video-title main-title">{this.props.video.metadata.title}</div>
                    </div> }

                    {this.getLinkedTickerLists()}
                </div>
            );
        } else {
            return <div></div>
        }

	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        loggedInUser: state.app.user,
        updateCollectionValue: state.app.updateCollection,
        totalScrolledPixels: state.app.totalScrolledPixels,
        video: state.video.video,
        currentVideo: state.player.currentVideo,
        preloadVideoValue: state.app.preloadVideo,
        clientWidth: state.app.clientWidth,
        clientHeight: state.app.clientHeight
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        updateQueryString,
        showDrawer,
        preloadVideo,
        loadVideo,
        clearVideo,
        updateCurrentVideo,
        searchVideos
	})(Video))
}
