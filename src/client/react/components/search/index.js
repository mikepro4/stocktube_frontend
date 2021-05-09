import React, { Component } from "react";
import { connect } from "react-redux";
import {  withRouter, NavLink, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import { resetForm } from "../../../redux/actions/formActions"

import {
    hideSearch
} from '../../../redux/actions/appActions'

import QueryForm from "./query_form"

class Search extends Component {

    state = {
        loading: false,
    }

    onSubmit(values) {
        console.log(values)

		this.setState({
			loading: true
        })

    }

    onChange(values) {
        console.log(values)

		this.setState({
			loading: true
        })

    }

    onSearchClear() {
        console.log("clear")
    }
 
	render() {

		return (
            <div className={"search-container theme-" + this.props.theme}>
                <div className={"app-header main-header theme-" + this.props.theme}>
                    <div className={"app-header-container theme-" + this.props.theme}>

                        <div className="options-query-container">

                            <QueryForm 
                                ref="QueryForm"
                                enableReinitialize="true"
                                onChange={this.onChange.bind(this)}
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
                                            this.props.onSearchClear()
                                        }}
                                    />
                                </div>}

                        </div>

                        <ul className="app-actions">
                            <li className="action-menu">
                                <Button 
                                    minimal="true"
                                    text="Cancel"
                                    className={"control theme-"+ this.props.theme}
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
                    <div className="placeholder">test</div>

                </div>
                
            </div>

        )
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        authenticated: state.auth.authenticated,
        queryForm: state.form.queryForm
	};
}

export default withRouter(connect(mapStateToProps, {
    hideSearch,
    resetForm
})(Search));
