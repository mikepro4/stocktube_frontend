import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter, NavLink, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Spinner  } from "@blueprintjs/core";
import debounce from 'lodash/debounce';

import { resetForm } from "../../../redux/actions/formActions"

import {
    hideSearch,
    searchResults,
    searchResultsClear
} from '../../../redux/actions/appActions'

import {
    searchTrending
} from '../../../redux/actions/trendingActions'

import QueryForm from "./query_form"

import Throbber from "../throbber"

import SearchTickerView from "../list/views/search/ticker"
import SearchUserView from "../list/views/search/user"
import SearchVideoView from "../list/views/search/video"
import SearchChannelView from "../list/views/search/channel"

import ListResults from "../list"

class Search extends Component {

    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.debouncedOnChange = debounce(this.onChange, 250);
      }

    state = {
        scrollTop: 0
    }

    componentDidMount() {
        let node = document.getElementById("search-content")
        node.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        let node = document.getElementById("search-content")
        node.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (event) => {
        this.setState({
            scrollTop: document.getElementById("search-content").scrollTop
        })
    }


    onSubmit(values) {
        this.props.searchResults(values.query)
    }

    onChange(values) {
        this.props.searchResults(values.query)
    }

    onSearchClear() {
        this.props.searchResultsClear()
    }

    renderTickers() {
        return(
            <div className="search-results-group results-tickers">
                <div className="group-title">Tickers</div> 
                {this.props.search.results.tickers.map(item => {
					return <SearchTickerView item={item} key={item._id} />
				})}
            </div>
        )
    }

    renderUsers() {
        return(
            <div className="search-results-group results-users">
                <div className="group-title">Users</div>  
                {this.props.search.results.users.map(item => {
					return <SearchUserView item={item} key={item._id} />
				})}
            </div>
        )
    }

    renderVideos() {
        return(
            <div className="search-results-group results-videos">
                <div className="group-title">Videos</div>   
                {this.props.search.results.videos.map(item => {
					return <SearchVideoView item={item} key={item._id} />
				})}
            </div>
        )
    }

    renderChannels() {
        return(
            <div className="search-results-group results-channels">
                <div className="group-title">Channels</div>    
                {this.props.search.results.channels.map(item => {
					return <SearchChannelView item={item} key={item._id} />
				})}
            </div>
        )
    }

    renderContent() {
        if(this.props.search.loading) {
            return(<Throbber/>)
        } else {
            return(
                <div className="search-results">
                    {this.props.search.results.tickers && this.props.search.results.tickers.length > 0 && this.renderTickers()}
                    {this.props.search.results.users && this.props.search.results.users.length > 0 && this.renderUsers()}
                    {this.props.search.results.videos && this.props.search.results.videos.length > 0 && this.renderVideos()}
                    {this.props.search.results.channels && this.props.search.results.channels.length > 0 && this.renderChannels()}
                </div>
            )
        }
    }

    renderTrending() {
        if(this.props.queryForm && !this.props.queryForm.values) {
            return(
                <div className="search-results-group results-channels trending">
                    <div className="group-title">Trending</div>    
                    
                    <ListResults
                        type="tickers"
                        resultType="search-ticker-display"
                        searchCollection={this.props.searchTrending}
                        scrollTop={this.state.scrollTop}
                    />

                    
                </div>
            )
        }
    }

	render() {

		return (
            <div className={"search-container theme-" + this.props.theme}  id="search-content">
                <div className={"app-header main-header theme-" + this.props.theme}>
                    <div className={"app-header-container theme-" + this.props.theme}>

                        <div className="options-query-container">

                            <QueryForm 
                                ref="QueryForm"
                                enableReinitialize="true"
                                onChange={this.debouncedOnChange}
                                onSubmit={this.onSubmit.bind(this)}
                            />

                            {this.props.queryForm 
                                && this.props.queryForm.values 
                                && this.props.queryForm.values.query
                                && <div className="query-reset-button">
                                    <Button
                                        minimal="true"
                                        icon="cross"
                                        small="true"
                                        onClick={() =>  {
                                            this.props.resetForm("queryForm")
                                            this.onSearchClear()
                                        }}
                                    />
                                </div>}

                        </div>

                        <ul className="app-actions">
                            <li className="action-menu">
                                <Button 
                                    minimal="true"
                                    text="Cancel"
                                    className={"control control-text theme-"+ this.props.theme}
                                    onClick={() =>  {
                                        this.props.hideSearch()
                                        }
                                    }
                                />
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="search-content">
                    
                    {this.props.queryForm && this.props.queryForm.values && this.props.queryForm.values.query && this.renderContent()}
                    {this.renderTrending()}
                </div>
                
            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated,
        queryForm: state.form.queryForm,
        search: state.app.search
	};
}

export default withRouter(connect(mapStateToProps, {
    hideSearch,
    resetForm,
    searchResults,
    searchResultsClear,
    searchTrending
})(Search));
