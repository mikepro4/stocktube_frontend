import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"
import Dropzone from "react-dropzone";
import axios from "axios";

import UploadButton from "../upload_button"

class ImageUploader extends Component {

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
			formData.append("upload_preset", "mainPostImage"); 
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

                    this.props.addImage(data.secure_url)

                    // this.props.updateCover(this.props.user._id, data.secure_url)
                    // this.props.hideDrawer()
				});
		});
    };

	render() {

        return (
           <div className="image-uploader">
                {/* <Icon icon="media" iconSize={16} onClick={() => alert("test")} /> */}
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
                                    "upload-button-container": true,
                                })}
                            >
                                <input {...getInputProps()} />
                                    
                                <Icon icon="media" iconSize={16} />
                            </div>
                        </section>
                    )}
                </Dropzone>
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

export default connect(mapStateToProps, {
})(ImageUploader);
