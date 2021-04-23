import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"
import Dropzone from "react-dropzone";
import axios from "axios";

import { 
    updateCover,
    updateCoverGradient
} from "../../../../redux/actions/profileActions"


import Gradients from "../../gradients"


class CoverSelect extends Component {

    state = {
        loading: false,
        progress: null
    }

    handleDrop = files => {
		const uploaders = files.map(file => {
			// Progress
			var config = {
				onUploadProgress: (progressEvent) => {
					let percentCompleted = Math.round(
						progressEvent.loaded * 100 / progressEvent.total
					);
					console.log(
						"onUploadProgress called with",
						arguments,
						"Percent Completed:" + percentCompleted
                    );
                    
                    this.setState({
                        loading: true,
                        progress: percentCompleted  
                    })
				}
			};
			// Initial FormData
			const formData = new FormData();
			formData.append("file", file);
			formData.append("tags", `stocktube`);
			formData.append("upload_preset", "lacclrie"); 
			formData.append("api_key", "DhgKXiXYQqQj0nEB74w_70HfPWI"); 
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
                        loading: false,
                        progress: null
                    });

                    this.props.updateCover(this.props.user._id, data.secure_url)
                    // this.props.hideDrawer()
				});
		});
    };
    
    renderButtonTitle() {
        if(this.state.loading && this.state.progress) {
            return (
                <div>Uploading {this.state.progress}%</div>
            )
        }
        return (<div>Upload cover image</div>)
    }

	render() {
            return (
                <div className={"app-drawer-content-container standard-drawer theme-" + this.props.theme}>
                   
                    <div className={"user-details-container theme-" + this.props.theme}>
                        <div className="drawer-header">
                            <div className="drawer-title">
                                Cover Image
                            </div>

                            <div className="drawer-description">
                            We recommend uploading a cover image of certain size 
                            </div>

                            <Button 
                                minimal="true"
                                icon="cross"
                                className={"control theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.hideDrawer()
                                    }
                                }
                            />

                        <Dropzone 
                            onDrop={this.handleDrop}
                            accept="image/*"
                        >
                            {({getRootProps, getInputProps}) => (
                                <section 
                                
                                >
                                    <div 
                                        {...getRootProps()}
                                        className={classNames({
                                            "avatar-container": true,
                                            "default": this.props.user && this.props.user.avatarDefault,
                                            "small": this.props.small,
                                            "medium": this.props.medium,
                                            "big": this.props.big,
                                            "huge": this.props.huge
                                        })}
                                    >
                                        <input {...getInputProps()} />
                                            <div 
                                                className={"upload-button theme-"+ this.props.theme}
                                                onClick={() =>  {
                                                    }
                                                }
                                            >

                                                <div className="upload-button-progress-bar"></div>
                                                <div className="upload-button-title">
                                                    {this.renderButtonTitle()}
                                                </div>

                                            </div>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                        <Gradients
                            updateGradient={(gradient) =>  this.props.updateCoverGradient(this.props.user._id, gradient)}
                            rect={true}
                        />
                        </div>
                    </div>
                </div>
    
            )
 
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated
	};
}

export default withRouter(connect(mapStateToProps, {
    updateCover,
    updateCoverGradient
})(CoverSelect));
