import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";
import * as _ from "lodash"
import moment from "moment"
import {updateLocale } from "moment"

import { updateCurrentVideo } from "../../../../redux/actions/playerActions"

import { 
    searchVideos
} from "../../../../redux/actions/videosActions";

import YoutubePlayer from "../../player/"


import ListResults  from "../../../components/list"

import TickerListDisplay from './search/ticker'


class HorizontalView extends Component {

    render() {
        return(
            <div className="horizontal-videos-container">
                <TickerListDisplay item={this.props.item}/>

                <ListResults
                    type="ticker-video-suggestions"
                    identifier={this.props.item.metadata.symbol}
                    resultType="video-preview-small"
                    searchCollection={this.props.searchVideos}
                    horizontal={true}
                    limit={5}
                />
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
    searchVideos
})(HorizontalView));
