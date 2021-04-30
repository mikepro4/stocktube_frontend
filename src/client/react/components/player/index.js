import React, { PropTypes } from "react";
import YouTube from "react-youtube";
import classnames from "classnames";
import moment from "moment";
import * as _ from "lodash";
import { connect } from "react-redux";

import {
	updatePlayerStatus,
	updateTime,
	updatePlaylist
} from "../../../redux/actions/playerActions";

import { updateCurrentVideo } from "../../../redux/actions/playerActions";

import { disableVideo } from "../../../redux/actions/videosActions";

import { showDrawer } from "../../../redux/actions/appActions";

class YoutubePlayer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            loaded: false,
			player: null,
			timeInterval: null
		};
	}

	onReady(event) {
		this.setState({
			player: event.target
        },()=> {
        });
        
	}

	onStateChange(event) {
		clearInterval(this.state.timeInterval);
		if (this.props.currentVideo.videoId != this.props.player.playingVideoId) {
			this.clearTime();
		}
	}

	componentDidUpdate(prevProps) {
		if (
			!_.isEqual(
				prevProps.player.playlist.current,
				this.props.player.playlist.current
			)
		) {
			this.playCurrent();
		}
		switch (this.props.currentVideo.playerAction) {
			case "play":
				return this.playVideo();
			case "pause":
				return this.pauseVideo();
			case "stop":
				return this.stopVideo();
				
		}

		if (this.props.player && this.props.player.status == "seek") {
			if (this.props.player.seekToTime !== prevProps.player.seekToTime) {
				this.seekVideo();
			}
		}

		if (
			this.props.playlist &&
			this.props.playlist.current &&
			this.props.playlist.current.clip &&
			this.props.player.currentTime >= this.props.playlist.current.clip.end
		) {
			this.playNextClip();
        }

        if(prevProps.currentVideo.videoId !== this.props.currentVideo.videoId) {
            if(this.props.currentVideo.videoId !== this.props.videoId && this.state.player) {
                this.state.player.pauseVideo();
            }
        }

        // if(this.props.currentVideo.videoId !== this.props.videoId && this.props.currentVideo.playerAction == "playing") {
        //     this.state.player.pauseVideo();
        // } 
        
	}

	playNextClip = () => {
		let sortedClips = _.sortBy(
			this.props.playlist.current.track.clips,
			clip => {
				return clip.start;
			}
		);

		this.launchNextClip(sortedClips);
	};

	launchNextClip = clips => {
		let currentIndex = _.findIndex(clips, {
			_id: this.props.playlist.current.clip._id
		});

		let newIndex = currentIndex + 1;

		if (newIndex >= clips.length) {
			this.state.player.stopVideo();
		} else if (newIndex < clips.length) {
			let current = {
				video: this.props.video,
				track: this.props.playlist.current.track,
				clip: clips[newIndex]
			};
			// this.props.selectClip(clips[newIndex]);

			this.props.updatePlaylist(current);

			setTimeout(() => {
				this.state.player.seekTo(this.props.playlist.current.clip.start);
			}, 1);
		}
	};

	playCurrent = () => {
		if (
			this.props.player.playlist &&
			this.props.player.playlist.current &&
			this.props.player.playlist.current.clip
		) {
			const clip = this.props.player.playlist.current.clip;
			if (!_.isEmpty(clip)) {
				this.playVideo();
				// this.props.selectClip(this.props.player.playlist.current.clip);

				// fake delay needed for the video switch/seek
				setTimeout(() => {
					this.state.player.seekTo(clip.start);
				}, 2);
			}
		}
	};

	playPauseSwitch() {
		// switch (this.props.currentVideo.playerAction) {
		// 	case "playing":
		// 		return this.pauseVideo();
		// 	case "paused":
		// 		return this.playVideo();
		// 	case "stopped":
		// 		return this.playVideo();
		// 	case undefined:
		// 		return this.playVideo();
		// 	default:
		// 		return this.playVideo();
		// }
	}

	seekToClip() {}

	playVideo() {
		if (this.props.player.initial) {
			this.state.player.mute();
		} else {
			this.state.player.unMute();
		}

		console.log("play video");
		clearInterval(this.state.timeInterval);
		this.props.updateCurrentVideo(this.props.currentVideo.videoId, "waiting");

		// fake delay needed for the video switch
		setTimeout(() => {
			this.state.player.playVideo();
			this.props.updateCurrentVideo(this.props.currentVideo.videoId, "playing");
		}, 1);
	}

	pauseVideo() {
		console.log("pause video");
		this.state.player.pauseVideo();
	}

	stopVideo() {
		this.clearTime();
		console.log("stop video");
		if(this.state.player) {
			this.state.player.stopVideo();
			this.props.updateCurrentVideo(this.props.currentVideo.videoId, "stopped");
		}
	}

	seekVideo() {
		console.log("seek to");
		this.pauseVideo();
		clearInterval(this.state.timeInterval);
		const seekToSeconds = this.props.player.seekToTime;
		this.state.player.mute();

		// fake delay needed for the video switch/seek
		setTimeout(() => {
			this.state.player.seekTo(seekToSeconds);
			// this.state.unMute();
			// setTimeout(() => {
			// 	this.pauseVideo();
			// }, 10);
		}, 2);
		// }
	}

	onEnd() {
		this.stopVideo();
    }
    
    checkVideo() {

        // if(this.props.currentVideo.videoId !== this.props.videoId) {
        //     this.state.player.pauseVideo();
        // } 

        this.setState({ timeInterval: null });
        this.props.updateCurrentVideo(this.props.videoId, "playing");

        this.startTimeInterval();
    }

	onPlay(event) {
        console.log("onPlay");
        this.checkVideo()
        
	}

	onPause(event) {
		console.log("onPause");
		clearInterval(this.state.timeInterval);
		// this.props.updateCurrentVideo(this.props.videoId, "paused");
		if (this.state.player) {
			this.props.updateTime(
				this.state.player.getDuration(),
				this.state.player.getCurrentTime()
			)
		}
	}

	startTimeInterval() {
		const timeInterval = setInterval(() => {
			this.props.updateTime(
				this.state.player.getDuration(),
				this.state.player.getCurrentTime()
			);
		}, 100);

		this.setState({ timeInterval });
	}

	componentDidMount() {
		clearInterval(this.state.timeInterval);
	}

	componentWillUnmount() {
		clearInterval(this.state.timeInterval);
	}

	clearTime() {
		if(this.state.player) {
			this.props.updateTime(this.state.player.getDuration(), 0);
		}
		
	}

	onStop() {
		if(this.state.player) {
			this.props.updateTime(this.state.player.getDuration(), 0);
		}
    }
    
    renderDescription() {
        switch (this.props.currentVideo.playerAction) {
			case "playing":
				return(
                    <div className="video-description-container fade">{this.props.video.metadata.title}</div>
                );
			case "paused":
				return(
                    <div className="video-description-container active">{this.props.video.metadata.title}</div>
                )
			case "stopped":
				return(
                    <div className="video-description-container stopped">{this.props.video.metadata.title}</div>
                )
			case undefined:
				return(<div className="video-description-container"></div>);
			default:
				return (<div className="video-description-container"></div>)
		}
    }

    renderThumbnail() {
        return(
            <div 
                className=""
                onClick={() => {
                    this.setState({ loaded: true})
                }
                }
            > thumbnail</div>
        )
    }

	render() {
        
		const videoPlayerOptions = {
			height: this.props.height ? this.props.height : "170",
			width: this.props.width ? this.props.width : "270",
			playerVars: {
				controls: 1,
				showinfo: 1,
				playsinline: 1,
				disablekb: 1,
				modestbranding: 1
			}
		};

		let videoClasses = classnames({
			"video-container": true,
			"video-loaded": this.props.currentVideo.videoId
		});

		return (
			<div className={videoClasses}>
				
                {this.state.loaded ? <div> 
                    <div
					className="player-overlay"
					onClick={() => {
						this.props.showDrawer("video-drawer");
					}}
				>
                </div>
                    <YouTube
					videoId={this.props.videoId}
					opts={videoPlayerOptions}
					onReady={this.onReady.bind(this)}
					onPlay={this.onPlay.bind(this)}
					onStop={this.onStop.bind(this)}
					onPause={this.onPause.bind(this)}
                    onEnd={this.onEnd.bind(this)}
                    onError={() => this.props.disableVideo(this.props.currentVideo.videoId)}  
					className="player-video"
					onStateChange={this.onStateChange.bind(this)}
				/> </div>: this.renderThumbnail()}
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		player: state.player,
		playlist: state.player.playlist,
        currentVideo: state.player.currentVideo,
        video: state.player.currentVideo.video
	};
}

export default connect(mapStateToProps, {
	updateCurrentVideo,
	updateTime,
    updatePlaylist,
    disableVideo,
    showDrawer
})(YoutubePlayer);
