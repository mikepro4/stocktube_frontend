import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

class PostView extends Component {

    state = {
        loading: false
    }

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	componentDidUpdate(prevprops) {

	}

	render() {
		return (
			<div>Post: {this.props.item._id}</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
        app: state.app
	};;
}

export default connect(mapStateToProps, {
})(withRouter(PostView));
