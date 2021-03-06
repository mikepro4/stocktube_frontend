import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

import {
    updateCollection
} from "../../../redux/actions/appActions"


import PostView from "./views/postView"
import VideoPreview from "./views/videoPreview"
import VideoCard from "./views/videoCard"
import UserDisplay from "./views/userDisplay"

import TickerListDisplay from "./views/tickerListDisplay"

import SearchTickerDisplay from "./views/search/ticker"

import HorizontalVideos from "./views/horizontalVideos"

import VideoPreviewVertical from "./views/search/videoVertical"

class ListResults extends Component {

    state = {
        collection: [],
        loading: false,
        offset: 0,
        limit: 5,
        count: null,
        updateCollection: false,
        horizontalScroll: 0,
    }




	componentDidMount() {
        this.searchCollection()

        if(this.props.horizontal) {
            let node = document.getElementById(this.props.type+this.props.identifier)
            node.addEventListener('scroll', this.handleScroll);
        }
    }
    
    handleScroll = (event) => {
        if(this.props.horizontal) {
            this.setState({
                horizontalScroll: document.getElementById(this.props.type+this.props.identifier).scrollLeft,
            })
        }
       
        // this.props.updateTotalScrolledPixels(document.getElementById("body").scrollTop)
    }

	componentWillUnmount() {
	}

	componentDidUpdate(prevprops) {

        if(prevprops.scrollTop !== this.props.scrollTop) {
            if(this.props.searchOpen || this.props.drawerOpen) {
                if(this.refs["loadMore"+this.props.resultType+this.props.identifier] && !this.state.loading) {
                    if((this.props.scrollTop + 200)  > (this.refs["loadMore"+this.props.resultType+this.props.identifier] - this.props.app.totalPixels)) {
                        if( !this.props.updateCollectionValue) {
                            this.searchCollection(this.getLimit())
                        }
                    }
                }
            }
        }

        if(prevprops.identifier !== this.props.identifier) {
            this.searchCollection(null, true)
        }

		if(prevprops.updateCollectionValue !== this.props.updateCollectionValue) {
            if( this.props.updateCollectionValue && !this.state.loading) {
                this.setState({
                    updateCollection: true
                })
                this.searchCollection(null, true)
            }
        } else {
            // const loadMore = document.getElementById("loadMore"+this.props.resultType+this.props.identifier)
            if(!this.props.horizontal) {
                const loadMore = this.refs["loadMore"+this.props.resultType+this.props.identifier]

                

                if(loadMore && !this.state.loading) {
                    if(this.props.searchOpen || this.props.drawerOpen) {
                       
                    } else {
                        if(loadMore) {
                            if((this.props.app.totalScrolledPixels + 200)  > (loadMore.offsetTop - this.props.app.totalPixels)) {
                                if( !this.props.updateCollectionValue) {
                                    this.searchCollection(this.getLimit())
                                }
                            }
                        }
                    }
                    
                }
            } else if (this.props.horizontal) {
                const loadMore = this.refs["loadMore"+this.props.resultType+this.props.identifier]

                if(loadMore && !this.state.loading) {
                    if(this.state.horizontalScroll + 100 > loadMore.getBoundingClientRect().x) {
                        if( !this.props.updateCollectionValue) {
                            console.log("test")
                            this.searchCollection(this.getLimit())
                        }
                    }
                } 
            }
            
        }
    }

    getLimit = () => {
        return this.props.limit ? this.props.limit : 20
    }
    

	searchCollection = (offset, reset) => {
        if(!offset) {
            offset = 0
        }
        this.setState({
            loading: true
        })

        let newOffset 

        if(reset) {
            newOffset = 0
        } else {
            newOffset = this.state.offset + offset
        }

		this.props.searchCollection(
            this.props.type,
            this.props.identifier,
			newOffset,
            this.getLimit(), 
            "",
            (results) => {
                let newCollection = _.concat(this.state.collection, results.all)
                console.log(newCollection)

                if(this.props.onInitialLoad && this.state.collection.length == 0) {
                    this.props.onInitialLoad(results.all)
                }

                if(reset) {
                    this.setState({
                        collection: results.all,
                        offset: newOffset,
                        count: results.count,
                        loading: false,
                        updateCollection: false
                    })
                    
                } else {
                    this.setState({
                        collection: newCollection,
                        offset: newOffset,
                        count: results.count,
                        loading: false,
                        updateCollection: false
                    })
                }

               

                this.props.updateCollection(false)

            }
        )
    };

	renderLoadMoreButton = () => {
		if (
			this.state.count >
			this.state.offset 
		) {
			return (
				<a className="anchor-button" id={"loadMore"+this.props.resultType+this.props.identifier}  ref={"loadMore"+this.props.resultType+this.props.identifier} onClick={() => this.searchCollection(5)}>
                    
				</a>
			);
		}
	};

	renderResultItem = (item) => {
		switch (this.props.resultType) {
			case "post":
                if(!this.state.updateCollection) {
                    return (<PostView
                        item={item}
                        key={item._id}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "video-preview-small":
                if(!this.state.updateCollection) {
                    return (<VideoPreview
                        item={item}
                        key={item._id}
                        small={true}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "video-card":
                if(!this.state.updateCollection) {
                    return (<VideoCard
                        item={item}
                        key={item._id}
                        small={true}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "user-display":
                if(!this.state.updateCollection) {
                    return (<UserDisplay
                        item={item}
                        key={item._id}
                        small={true}
                        followingUser={this.props.followingUser}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "ticker-display":
                if(!this.state.updateCollection) {
                    return (<TickerListDisplay
                        item={item}
                        key={item._id}
                        small={true}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "search-ticker-display":
                if(!this.state.updateCollection) {
                    return (<SearchTickerDisplay
                        item={item}
                        key={item._id}
                        small={true}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
            case "horizontal-videos":
                if(!this.state.updateCollection) {
                    return (<HorizontalVideos
                        item={item}
                        key={item._id}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }

            case "video-preview-vertical":
                if(!this.state.updateCollection) {
                    return (<VideoPreviewVertical
                        item={item}
                        key={item._id}
                    />)
                } else {
                    return(<div key={item._id}/>)
                }
                       
			default:
				return(
					<div></div>
				)
		}
	}

	render() {
		return (
            <div 
                className={
                    classNames({
                        "list-results": true,
                        "horizontal": this.props.horizontal
                    })
                }
                style={{
                    height: this.props.height ? this.props.height: "inherit"
                }}
                id={this.props.type+this.props.identifier}
            >
				{this.state.collection.map(item => {
					return this.renderResultItem(item)
				})}

				{this.renderLoadMoreButton()}
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
        app: state.app,
        updateCollectionValue: state.app.updateCollection,
        location: state.router.pathname,
        drawerOpen: state.app.drawerOpen,
        searchOpen: state.app.searchOpen
	};;
}

export default connect(mapStateToProps, {
    updateCollection
})(withRouter(ListResults));
