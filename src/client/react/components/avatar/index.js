import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"
import Dropzone from "react-dropzone";
import axios from "axios";

import {
    showDrawer
} from '../../../redux/actions/appActions'

class Avatar extends Component {

    state = {
        imageUrl: ""
    };
    
    handleDrop = files => {
		const uploaders = files.map(file => {
			// Progress
			var config = {
				onUploadProgress: function(progressEvent) {
					let percentCompleted = Math.round(
						progressEvent.loaded * 100 / progressEvent.total
					);
					console.log(
						"onUploadProgress called with",
						arguments,
						"Percent Completed:" + percentCompleted
					);
				}
			};
			// Initial FormData
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `stocktube`);
			formData.append("upload_preset", "fxyrzlso"); // Replace the preset name with your own
			formData.append("api_key", "DhgKXiXYQqQj0nEB74w_70HfPWI"); // Replace API key with your own Cloudinary key
			formData.append("timestamp", (Date.now() / 1000) | 0);

			return axios
				.post(
					"https://api.cloudinary.com/v1_1/dcdnt/image/upload",
					formData,
					config
				)
				.then(response => {
					const data = response.data;
                    const fileURL = data.secure_url;
                    
					this.setState({
						imageUrl: fileURL,
                    });
                    
					this.props.onSuccess(data.secure_url);
				});
		});
	};


	render() {
        let gradient 

        if(this.props.user) {
            gradient = this.props.user.avatarGradient 
        } 

        if (this.props.canUpload) {
            return(
                <section 
                    className={"gradient-" +  gradient + " " + classNames({
                        "avatar-container": true,
                        "default": this.props.user && this.props.user.avatarDefault,
                        "small": this.props.small,
                        "medium": this.props.medium,
                        "big": this.props.big,
                        "huge": this.props.huge,
                        "mini": this.props.mini
                    })}
                    onClick={() => this.props.showDrawer("avatar-select") }
                >
                    {this.props.user && !this.props.user.avatarGradient ? (
                        <img src={this.props.user && this.props.user.avatar}  />
                    ) : "" }
                </section>
            )
        } else {
            return (
                <div 
                    className={"gradient-" +  gradient + " " + classNames({
                        "avatar-container": true,
                        "default": this.props.user && this.props.user.avatarDefault,
                        "small": this.props.small,
                        "medium": this.props.medium,
                        "big": this.props.big,
                        "huge": this.props.huge,
                        "mini": this.props.mini
                    })}
                > {this.props.user && !this.props.user.avatarGradient ? (
                    <img src={this.props.user && this.props.user.avatar}/>
                ) : "" }
                </div>
            )
        }
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated,
	};
}

export default connect(mapStateToProps, {
    showDrawer
})(Avatar);
