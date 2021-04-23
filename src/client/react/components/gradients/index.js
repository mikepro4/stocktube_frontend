import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import {
    hideDrawer
} from '../../../redux/actions/appActions'

class Gradients extends Component {

    state = {
        hide: false,
        gradients: [
            {
                id: 1,
                name: "gradient-1",
            },
            {
                id: 2,
                name: "gradient-2",
            },
            {
                id: 3,
                name: "gradient-3",
            },
            {
                id: 4,
                name: "gradient-4",
            },
            {
                id: 5,
                name: "gradient-5",
            },
            {
                id: 6,
                name: "gradient-6",
            }
        ]
    }

    hideDrawer() {
        this.setState({
            hide: true
        })
        setTimeout(() => {
            this.props.hideDrawer()
        }, 300)
    }


	render() {

        return (
            <div className={"gradient-list theme-" + this.props.theme}>
                {this.state.gradients.map((gradient) => {
                    return (
                        <div 
                            className={"single-gradient gradient-" + gradient.id + " " + classNames({
                                "rect": this.props.rect,
                                "circular": this.props.circular,
                                "active": this.props.user.coverGradient && this.props.user.coverGradient == gradient.id
                            })} 
                            key={gradient.id}
                            onClick={() => this.props.updateGradient(gradient.id)}
                        > </div>
                    )
                })}
            </div>
        )
		
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        user: state.app.user
	};
}

export default connect(mapStateToProps, {
    hideDrawer
})(Gradients);
