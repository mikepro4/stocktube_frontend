import {
	UPDATE_STATUS,
	UPDATE_TIME,
	RESET_VIDEO,
	SEEK_TO_TIME,
	UPDATE_PLAYLIST,
	CURRENT_VIDEO_UPDATE,
	UPDATE_CURRENT_TIME
} from "./types";

import * as _ from "lodash";


// =============================================================================

export const updateCurrentVideo = (id, action, seconds, video) => dispatch => {
	dispatch({
		type: CURRENT_VIDEO_UPDATE,
		payload: id,
		playerAction: action,
        seconds,
        video
	});
};

// =============================================================================

export const updatePlaylist = (current, next, previous) => dispatch => {
	dispatch(updateCurrentTime(0));
	dispatch({
		type: UPDATE_PLAYLIST,
		payload: {
			current,
			next,
			previous
		}
	});
};

// =============================================================================

export function updatePlayerStatus(status) {
	return {
		type: UPDATE_STATUS,
		status: status
	};
}

// =============================================================================

export function updateCurrentTime(currentTime) {
	return {
		type: UPDATE_CURRENT_TIME,
		currentTime
	};
}

// =============================================================================

export function updateTime(duration, currentTime) {
	return {
		type: UPDATE_TIME,
		duration,
		currentTime
	};
}

// =============================================================================

export function resetVideo() {
	return {
		type: RESET_VIDEO
	};
}

// =============================================================================

export function seekToTime(seconds) {
	return {
		type: SEEK_TO_TIME,
		seconds
	};
}

// =============================================================================

export const resetInitial = () => dispatch => {
	dispatch({
		type: RESET_INITIAL,
		initial: false
	});
};