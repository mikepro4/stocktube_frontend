import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import uuid from "uuid";

import {
    searchTrending
} from '../../../redux/actions/trendingActions'

import ListResults from "../../components/list"



class HomePage extends Component {

	state = {
		scrollTop: 0
	}

	componentDidMount() {
	}

	componentDidUpdate(prevprops) {
    }
    
    renderHead = () => (
		<Helmet>
			<title>Tickerrr - Home</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

	// componentDidMount() {
    //     let node = document.getElementById("body")
    //     node.addEventListener('scroll', this.handleScroll);
    // }

    // componentWillUnmount() {
    //     let node = document.getElementById("body")
    //     node.removeEventListener('scroll', this.handleScroll);
    // }

    // handleScroll = (event) => {
    //     this.setState({
    //         scrollTop: document.getElementById("body").scrollTop
    //     })
    // }

	render() {

		return (
     		<div>
				{this.renderHead()}

				<ListResults
					type="videos"
					resultType="horizontal-videos"
					searchCollection={this.props.searchTrending}
					limit={5}
				/>

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
		searchTrending
	})(HomePage))
}