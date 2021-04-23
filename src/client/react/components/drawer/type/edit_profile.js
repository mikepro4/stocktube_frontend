import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster  } from "@blueprintjs/core";

import * as _ from "lodash"

import { 
    updateCover,
    updateCoverGradient,
    updateProfile
} from "../../../../redux/actions/profileActions"

import EditProfileForm from "./edit_profile_form"

class EditProfile extends Component {

    state = {
        loading: false,
        progress: null
    }

    handleFormSubmit({ username, bio, url }) {
        console.log(username, bio, url)

		this.setState({
			loading: true
        })

        this.props.updateProfile(this.props.user._id, username, bio, url, this.props.profileUser.username, this.props.history, () => {
            this.props.hideDrawer()
            this.setState({
                loading: false
            })
        }, () => {
            this.showFailToast("Username already exists")
            this.setState({
                loading: false
            })
        })
    }

    showFailToast = (message, id) => {
		this.refs.toaster.show({
			message: message,
			intent: Intent.DANGER,
			iconName: "cross"
		});
	};


	render() {
            return (
                <div className={"app-drawer-content-container standard-drawer theme-" + this.props.theme}>
                   
                    <div className={"details-container theme-" + this.props.theme}>
                        <div className="drawer-header">
                            <div className="drawer-title">
                                Edit profile
                            </div>

                            <Button 
                                minimal="true"
                                icon="cross"
                                className={"control button-close theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.hideDrawer()
                                    }
                                }
                            />

                            <EditProfileForm 
                                enableReinitialize="true"
                                initialValues={
                                    {
                                        username: this.props.user.username,
                                        bio: this.props.user.bio,
                                        url: this.props.user.url
                                    }
                                }
                                loading={this.state.loading}
                                onSubmit={this.handleFormSubmit.bind(this)}
                                theme={this.props.theme}
                                originalUsername={this.props.profileUser.username}
                            />

                            <Toaster position={Position.TOP_CENTER} ref="toaster" />

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
        authenticated: state.auth.authenticated,
        profileUser: state.profile.user,
	};
}

export default withRouter(connect(mapStateToProps, {
    updateCover,
    updateCoverGradient,
    updateProfile
})(EditProfile));
