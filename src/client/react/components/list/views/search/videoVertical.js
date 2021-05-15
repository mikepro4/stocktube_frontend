import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import {updateLocale } from "moment"

import {
    hideSearch,
    preloadVideo
} from "../../../../../redux/actions/appActions"

import { updateCurrentVideo } from "../../../../../redux/actions/playerActions"

class VideoPreviewVertical extends Component {

    getVideoTime() {
        let date =  moment(this.props.item.createdAt).startOf('hour').fromNow( updateLocale("en", {
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

    render() {
        return(
            <div 
            className={classNames({
                "search-video-preview-vertical": true,
                "active": this.props.item.metadata.id == this.props.player.currentVideo.videoId
            })}>

                <Link 
                    to={"/video/" + this.props.item.googleId}
                    onClick={() => { 
                        this.props.preloadVideo(this.props.item)
                    }} 
                >
                    <div className="video-thumbnail">
                        <img src={this.props.item.metadata.thumbnail} />
                    </div>

                    <div className="video-details">
                        <div className="channel-name">{this.props.item.metadata.channel.name} 
                            <span className="video-name-divider">●</span> 
                            <span className="video-time">{this.getVideoTime()}</span>
                        </div>
                        <div className="video-title">{this.props.item.metadata.title}</div>
                    </div>
                </Link>
            </div>
        )
        
    }
}

function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        clientWidth: state.app.clientWidth,
        player: state.player
    };
}

export default withRouter(connect(mapStateToProps, {
    updateCurrentVideo,
    hideSearch,
    preloadVideo
})(VideoPreviewVertical));
