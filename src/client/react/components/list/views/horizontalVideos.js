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

    componentDidMount() {
        this.setState({
            mounted: true
        })
    }

    componentDidUpdate() {
        const container = document.getElementById("horizontalVideos" + this.props.item.metadata.symbol)
        console.log(this.props.totalScrolledPixels)
        console.log(container.offsetTop)

        let visible
        if((this.props.totalScrolledPixels + 1000) > container.offsetTop) {
            visible = true
        }
    }

    render() {
        const container = document.getElementById("horizontalVideos" + this.props.item.metadata.symbol)

        let visible = false
        if(container) {
            if((this.props.totalScrolledPixels + this.props.clientHeight + 100) > container.offsetTop) {
                visible = true
            }

            if(container.offsetTop < this.props.totalScrolledPixels - this.props.clientHeight) {
                visible = false
            }
        }


        return(
            <div className="horizontal-videos-container" id={"horizontalVideos" + this.props.item.metadata.symbol}>
                <TickerListDisplay item={this.props.item}/>

                {visible &&  <ListResults
                    type="ticker-video-suggestions"
                    identifier={this.props.item.metadata.symbol}
                    resultType="video-preview-vertical"
                    searchCollection={this.props.searchVideos}
                    horizontal={true}
                    limit={5}
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
        clientWidth: state.app.clientWidth,
        clientHeight: state.app.clientHeight,
        player: state.player,
        totalScrolledPixels: state.app.totalScrolledPixels

    };
}

export default withRouter(connect(mapStateToProps, {
    searchVideos
})(HorizontalView));
