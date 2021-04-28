import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import * as _ from "lodash"

import PostInput from "../../components/post_input"

import ListResults  from "../../components/list"

import { 
    updateCurrentVideo
} from "../../../redux/actions/playerActions";

import { 
    searchVideos
} from "../../../redux/actions/videosActions";

import YoutubePlayer from "../../components/player/";


class TabVideos extends Component {

    loadInitialVideo(results) {
        this.props.updateCurrentVideo(results[0].metadata.id, "stop", 0, results[0])
    }

    render() {
        return (
            <div className={"tab-content tab-videos theme-" + this.props.theme}>

                    <div 
                        className={classNames({
                            "ticker-player": true,
                            "sticky": true
                        })}
                    >
                    <YoutubePlayer
                        width="100%"
                        height="210px"
                        videoId="fG2cQ-s8j0E"
                    />
                </div>
                {this.props.ticker && <ListResults
                    type="ticker-video-suggestions"
                    identifier={this.props.ticker.metadata.symbol}
                    resultType="video-preview-small"
                    searchCollection={this.props.searchVideos}
                    onInitialLoad={(results) => this.loadInitialVideo(results)}
                />}
            </div>
        )

    }
}


function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        ticker: state.ticker.ticker
    };
}

export default connect(mapStateToProps, {
    updateCurrentVideo,
    searchVideos
})(TabVideos);
