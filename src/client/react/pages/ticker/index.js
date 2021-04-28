import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Icon, Button, Classes  } from "@blueprintjs/core";

import TabBar from "../../components/tab_bar"
import TabVideos from "./tab_videos"

import qs from "qs";

import moment from 'moment'
import * as _ from "lodash"
import { 
    updateQueryString,
    showDrawer
} from "../../../redux/actions/appActions";

import {
    loadTicker,
    getTickerConnection,
    getTickerFollowers,
    clearTicker,
    tickerFollow,
    tickerUnfollow
} from "../../../redux/actions/tickerActions";

import { 
    resetVideo,
} from "../../../redux/actions/playerActions";

import { 
    searchPriceWeek, 
    findPriceWeek 
} from "../../../redux/actions/pricesActions"

import TickerDisplay from "../../components/ticker_display";
import classNames from "classnames";

import Avatar from "../../components/avatar"

import ReactECharts from 'echarts-for-react';

class Ticker extends Component {

    state = {
        selectedTabId: "1",
        tabs: [
            "Videos",
            "Posts",
            "Stats"
        ],
        newCounts: false,
        connectionLoaded: false,
        week: [],
        renderWeek: false,
        weekOptions: {}
    }

    // static loadData(store, match, route, path, query) {
	// 	return store.dispatch(loadTicker(match.params.ticker));
	// }

    componentDidMount() {
        this.props.loadTicker(this.props.match.params.ticker.toUpperCase())
        document.getElementById("body").scrollTop = 0
        this.props.searchPriceWeek(this.props.match.params.ticker.toUpperCase())
    }

    componentDidUpdate(prevprops, prevparams) {
        if(prevprops.match.params.ticker !== this.props.match.params.ticker) {
            this.props.clearTicker()
            this.loadTicker(this.props.match.params.ticker.toUpperCase())
            this.setState({
                newCounts: false
            })
        }

        if (this.props.location.search) {
			if (prevparams.selectedTabId !== this.getQueryParams().selectedTabId) {
				this.setState({
					selectedTabId: this.getQueryParams().selectedTabId
				});
			}
        }

        if(this.props.ticker && !this.props.followers) {
            if(!this.state.newCounts) {
                this.updateConnections()
            }
        }

        if(this.props.ticker && this.props.loggedInUser && !this.props.connection) {
            this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol, () => {
                this.setState({
                    connectionLoaded: true
                })
            })
        }

        // if(prevprops.updateCollectionValue !== this.props.updateCollectionValue) {
        //     this.updateConnections()
        // }

        //////////////////./././././////////./././././/././././././/..//.

        let symbolIndex = _.findIndex(this.props.prices.week, {
            symbol: this.props.match.params.ticker.toUpperCase()
          });
      
          if(symbolIndex !== -1 && _.isEmpty(this.state.week)) {
            let item = this.props.ticker
      
              let newWeek = item.week.map((metric, i) => {
                let color
      
                if (i == 0) {
                  if(metric < item.week[1]) {
                    color = "red"
                  } else {
                    color = "green"
                  }
                } else {
                  color = "#CFD9E0"
                }
                          return {
                  value: metric,
                  itemStyle: { color: color },
                }
              })
              
              let weekPrices = this.props.prices.week[symbolIndex].series.map(day => {
                return day.close
              })
      
              let weekDays = this.props.prices.week[symbolIndex].series.map(day => {
                return day.date
              })
      
              let final = this.props.prices.week[symbolIndex].series.map(day => {
                let newDate = moment(day.date).format()
                return [
                  newDate,
                  day.close
                ]
              })
      
      
              let finalNewWeek = [
                {
                  value: [ 
                    moment().format(),
                    newWeek[0].value
                  ],
                  itemStyle: newWeek[0].itemStyle
                },
                [
                  moment().subtract(1, "days").format(),
                  newWeek[1].value
                ],
                [
                  moment().subtract(2, "days").format(),
                  newWeek[2].value
                ],
                [
                  moment().subtract(3, "days").format(),
                  newWeek[3].value
                ],
                [
                  moment().subtract(4, "days").format(),
                  newWeek[4].value
                ],
                [
                  moment().subtract(5, "days").format(),
                  newWeek[5].value
                ],
                [
                  moment().subtract(6, "days").format(),
                  newWeek[6].value
                ]
              ]
      
            this.setState({
              week: final,
              renderWeek: true,
              weekOptions: {
                  animation: false,
                  tooltip : {
                    trigger: 'axis',
                    axisPointer : {    
                      type : 'shadow' 
                    }
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '4%',
                    top: "5%",
                    containLabel: true
                  },
                  xAxis: {
                    type : 'time',
                    splitLine: {show:false},
                    axisLine: {
                        lineStyle: {
                            color: "#D6DFE4"
                        }
                    },
                    axisLabel: {
                        color: "#8A9BA9",
                        fontSize: "11px",
                        fontWeight: "500",
                        onZero: 0
                    }
                  },
                  yAxis: [
                      {
                        type : 'value',
                        axisLabel: {
                            color: "#8A9BA9",
                            fontSize: "11px",
                            fontWeight: "500",
                            formatter: '${value}'
                        },
                        splitNumber: 3,
                        min: 0,
                        splitLine: {
                          show: false
                        },
                      },
                      {
                        type : 'value',
                        axisLabel: {
                            color: "#8A9BA9",
                            fontSize: "11px",
                            fontWeight: "500",
                            onZero: 0
                        },
                       
                        splitNumber: 3,
                        min: 0
                      }
                  ],
                  series: [
                    {
                      name: 'Videos',
                      type: 'bar',
                      stack: 'Videos by week',
                      itemStyle: {
                          borderColor: 'rgba(0,0,0,0)',
                          color: '#CFD9E0'
                      }
                      ,
                      emphasis: {
                          itemStyle: {
                              borderColor: 'rgba(0,0,0,1)',
                          }
                      },
                      data: finalNewWeek,
                      yAxisIndex: 1,
                      },
                    {
                        data: final,
                        type: 'line'
                    }
                  ]
              }
            })
          }
    }

    getQueryParams = () => {
		return qs.parse(this.props.location.search.substring(1));
    };

    componentWillUnmount() {
        this.props.clearTicker()
        this.props.resetVideo()
    }

    loadProfile(symbol, update) {
        this.props.loadTicker(symbol.toUpperCase(), () => {
            if(update) {
                this.updateConnections()
            }
        })
    }
    
    renderHead = () => (
		<Helmet>
			<title>Stocktube - User</title>
			<meta property="og:title" content="Homepage" />
		</Helmet>
    )

    updateConnections() {
        this.setState({
            newCounts: true
        })
        this.props.getTickerFollowers(this.props.ticker.metadata.symbol)
    
    }
    
    handleTabChange = value => {
		this.setState({
			selectedTabId: value
		});

		this.props.updateQueryString(
			{ selectedTabId: value },
			this.props.location,
			this.props.history
        );

        if(this.props.totalScrolledPixels > document.getElementById("ticker-tabs").offsetTop) {
            document.getElementById("body").scrollTop = document.getElementById("ticker-tabs").offsetTop - 110
        }
        

    };
    
    renderTab = () => {
		switch (this.state.selectedTabId) {
			case "1":
				return(
                    <TabVideos />
    
                    )
			case "2":
				return(
					<div className="placeholder">2</div>
				)
			case "3":
				return(
					<div className="placeholder">3</div>
				)
			case "4":
				return(
					<div className="placeholder">4</div>
				)
			default:
				return ;
		}
    }

    getConnection() {
        this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol, () => {
            this.setState({
                connectionLoaded: true
            })
        })
        this.props.getTickerFollowers(this.props.ticker.metadata.symbol)
    }

    renderConnectionArea() {
        if(this.state.connectionLoaded) {
            let buttonText = this.props.connection && this.props.connection.following ? "Following" : "Follow"
            return(
                <div className="ticker-connection-area"> 
                    <Button 
                        text={buttonText}
                        className={"ticker-follow-button theme-"+ this.props.theme + " " + classNames({
                            "following": this.props.connection && this.props.connection.connection ? true : false,
                            "follow": !this.props.connection.connection,
                        })}
                        onClick={() =>  {
                            if(this.props.connection.connection) {
                                this.props.tickerUnfollow(this.props.connection.connection._id, () => {
                                   this.getConnection()
                                }) 
                            } else {
                                this.props.tickerFollow(this.props.ticker.metadata.symbol, () => {
                                    this.props.getTickerConnection(this.props.loggedInUser._id, this.props.ticker.metadata.symbol, () => {
                                        this.getConnection()
                                    })
                                })

                            }
                            }
                        }
                    />

                    <div className="featured-followers">
                        {this.props.featuredFollowers && this.props.featuredFollowers.map((follower) => {
                            if(!follower) {
                                return
                            } else {
                                return(
                                    <div key={follower._id} className="single-avatar"><Avatar user={follower.object} mini={true}/></div>
                                )
                            }
                            
                        })}
                    </div>

                    <div 
                        className={classNames({
                            "ticker-followers-count": true,
                            "one": this.props.followers == 1,
                            "two": this.props.followers == 2
                        })}
                    >
                            {this.props.followers} followers
                    </div>
                    
                </div>
            )
        } else {
            return(
                <div className="ticker-connection-area"> </div>
            )
        }
        
    }
   
	render() {

        return (
            <div className={"ticker-route theme-" + this.props.theme}>

                <div className="ticker-header">
                    <TickerDisplay
                        ticker={this.props.ticker}
                    />

                    <div className="ticker-actions">
                        <Button 
                            minimal="true"
                            icon="more"
                            className={"control theme-"+ this.props.theme}
                            onClick={() =>  {
                                this.props.showDrawer("ticker-actions", { ticker: this.props.ticker })
                                }
                            }
                        />
                    </div>
                </div>

                {this.renderConnectionArea()}

                <div className="ticker-chart-area">
                    {this.state.renderWeek ? ( <ReactECharts
                        option={this.state.weekOptions}
                        theme="my_theme"
                        style={{ height: 120, width: "100%" }}
                    />) : "Loading week"}
                </div>
                

                <TabBar
                    tabs={this.state.tabs}
                    activeTab={this.state.selectedTabId}
                    onTabChange={(tab) => this.handleTabChange(tab)}
                />

                <div id="ticker-tabs">
                    {this.renderTab()}
                </div>


            </div>
        );
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme,
        loggedInUser: state.app.user,
        updateCollectionValue: state.app.updateCollection,
        totalScrolledPixels: state.app.totalScrolledPixels,
        ticker: state.ticker.ticker,
        followers: state.ticker.followers,
        connection: state.ticker.connection,
        featuredFollowers: state.ticker.featuredFollowers,
        currentVideo: state.player.currentVideo,
        prices: state.prices
	};
}

export default {
	component: withRouter(connect(mapStateToProps, {
        updateQueryString,
        showDrawer,
        loadTicker,
        getTickerConnection,
        getTickerFollowers,
        clearTicker,
        resetVideo,
        tickerFollow,
        tickerUnfollow,
        searchPriceWeek, 
        findPriceWeek 
	})(Ticker))
}
