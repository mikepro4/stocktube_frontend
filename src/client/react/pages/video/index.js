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


class Ticker extends Component {

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
           this.playVideo()
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

   
	render() {

        return (
            <div className={"video-route theme-" + this.props.theme}>
                {this.renderHead()}

                {this.props.video && <YoutubePlayer
                    width="100%"
                    height="210px"
                    videoId="fG2cQ-s8j0E"
                />}
                {this.props.video && this.props.video.metadata.title}
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
        video: state.video.video,
        currentVideo: state.player.currentVideo,
        preloadVideoValue: state.app.preloadVideo
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        updateQueryString,
        showDrawer,
        preloadVideo,
        loadVideo,
        clearVideo,
        updateCurrentVideo
	})(Ticker))
}
