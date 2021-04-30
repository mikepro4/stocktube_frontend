import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent } from "@blueprintjs/core";

import * as _ from "lodash"

import PostInput from "../../components/post_input"

import ListResults  from "../../components/list"

import { 
    searchPosts
} from "../../../redux/actions/postsActions";



class TabPosts extends Component {


    render() {
        return (
            <div className={"tab-content tab-posts theme-" + this.props.theme}>
                {this.props.ticker && <ListResults
                    type="ticker"
                    identifier={this.props.ticker.metadata.symbol}
                    resultType="post"
                    searchCollection={this.props.searchPosts}
                />}
                
            </div>
        )

    }
}


function mapStateToProps(state) {
    return {
        theme: state.app.theme,
        user: state.app.user,
        authenticated: state.auth.authenticated,
        ticker: state.ticker.ticker
    };
}

export default connect(mapStateToProps, {
    searchPosts
})(TabPosts);
