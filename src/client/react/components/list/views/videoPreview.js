import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import * as _ from "lodash"

import { updateCurrentVideo } from "../../../../redux/actions/playerActions"

class VideoPreview extends Component {

    render() {
        return(
            <div 
            className={classNames({
                "video-preview": true,
                "small": this.props.small,
                "active": this.props.item.metadata.id == this.props.player.currentVideo.videoId
            })}
            onClick={() =>  {
                this.props.updateCurrentVideo(this.props.item.metadata.id, "play", 0, this.props.item)
            }}>
                <div className="video-thumbnail">
                    <img src={this.props.item.metadata.thumbnail} />
                </div>

                <div className="video-details">
                    <div className="channel-name">{this.props.item.metadata.channel.name}</div>
                    <div className="video-title">{this.props.item.metadata.title}</div>
                </div>
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
    updateCurrentVideo
})(VideoPreview));
