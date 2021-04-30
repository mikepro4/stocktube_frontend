import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

import * as _ from "lodash"

import { getSingleTickerPrice } from "../../../redux/actions/pricesActions"

class TickerPrice extends Component {

    state = {
        price: {}
    }
    componentDidMount() {
        this.props.getSingleTickerPrice(this.props.symbol, (price) => {
            this.setState({
                price
            })
        })
    }

    renderRegularPrice() {

        if(this.state.price.regularMarketPrice) {
            let regularChange = Number(this.state.price.regularMarketChange).toFixed(2)
            let regularChangePercent = Number(this.state.price.regularMarketChangePercent*100).toFixed(2)

            return(
                <div className="regular-price-container">
                    <div className="regular-price">{this.state.price.regularMarketPrice}</div>
                    <div className="regular-price-change-block">

                        <div   
                            className={classNames({
                                "regular-price-change-container": true,
                                "positive": regularChange > 0,
                                "negative": regularChange < 0,
                            })}
                        > {regularChange} </div>

                        <div   
                            className={classNames({
                                "regular-price-change-percent-container": true,
                                "positive": regularChange > 0,
                                "negative": regularChange < 0,
                            })}
                        > {Number(regularChangePercent).toFixed(2)}% </div>
                        
                    </div>
                    
                </div>
            )
        }
    }

    renderAfterhoursPrice() {
        if(this.state.price.postMarketPrice) {

            let afterhoursChange = Number(this.state.price.postMarketChange).toFixed(2)
            let afterhoursChangePercent = Number(this.state.price.postMarketChangePercent*100).toFixed(2)

            return(
                <div className="afterhours-price-container">
                    <span className="afterhours-price-label">After hours: </span>
                    <span className="afterhours-price afterhours-value">{this.state.price.postMarketPrice}</span>
                    <span className="afterhours-price-change-block">
                        <span   
                            className={classNames({
                                "afterhours-value": true,
                                "positive": afterhoursChange > 0,
                                "negative": afterhoursChange < 0,
                            })}
                        > {afterhoursChange} </span>

                        <span   
                            className={classNames({
                                "afterhours-value": true,
                                "positive": afterhoursChange > 0,
                                "negative": afterhoursChange < 0,
                            })}
                        > {Number(afterhoursChangePercent).toFixed(2)}% </span>
                    </span>
                    
                </div>
            )
        }
        
    }

	render() {
        if(this.state.price) {
            return(
                <div className="price-container">
                    {this.renderRegularPrice()}
                    {this.renderAfterhoursPrice()}
                </div>
            )
        } else {
            return (<div></div>)
        }
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
    getSingleTickerPrice
})(TickerPrice);
