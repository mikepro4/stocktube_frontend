import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

class HomePage extends Component {

	componentDidMount() {
	}

	componentDidUpdate(prevprops) {
    }
    
    renderHead = () => (
		<Helmet>
			<title>Stocktube - Home</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

	render() {

		return (
     		<div>
                 {this.renderHead()}
				<div className="placeholder">Home</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}


export default {
	component: withRouter(connect(mapStateToProps, {
	})(HomePage))
}