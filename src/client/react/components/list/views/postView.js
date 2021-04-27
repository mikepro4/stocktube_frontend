import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import {
    EditorState, convertFromRaw, convertToRaw, ContentState, CompositeDecorator ,
} from 'draft-js';

import * as _ from "lodash"

import * as R from 'remeda'

import {
    getSuggestions,
    suggestionsClear,
    updateCollection,
    showDrawer
} from "../../../../redux/actions/appActions"

import {
    updateCover,
    updateCoverGradient,
    updateProfile
} from "../../../../redux/actions/profileActions"

import {
    createPost
} from "../../../../redux/actions/postsActions"

import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';

import Portal from "react-portal";
import positionSuggestions from "draft-js-mention-plugin/lib/utils/positionSuggestions";

import TypeDollar from "../../icons/type_dollar"
import TypeMention from "../../icons/type_mention"

import Avatar from "./../../avatar"

import createLinkifyPlugin from 'draft-js-linkify-plugin';

import moment from "moment"

import {updateLocale } from "moment"

const mentionPlugin = createMentionPlugin();
const linkifyPlugin = createLinkifyPlugin({
    target: '_blank',
    component: (params) => <a {...R.omit(params, ['blockKey'])} />
});

import ImageDisplay from "../../image_display/"

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, MentionSuggestions, linkifyPlugin];

function Entry(props) {
    const {
      mention,
      theme,
      searchValue, // eslint-disable-line @typescript-eslint/no-unused-vars
      isFocused, // eslint-disable-line @typescript-eslint/no-unused-vars
      ...parentProps
    } = props;

    let renderContent
    if(mention.type == "user" ){
        renderContent = (
            <div className="mentionSuggestionsEntryContainer">
                <div className="mentionSuggestionsEntryContainerLeft">
                    <Avatar user={mention.user} mini={true} />
                </div>

                <div className="mentionSuggestionsEntryContainerRight">
                    <div className="mentionSuggestionsEntryText">
                        {mention.name}
                    </div>

                    <div className="mentionSuggestionsEntryTitle">
                        {mention.title}
                    </div>
                </div>
            </div>
        )
    } else if(mention.type == "ticker" ){
        renderContent = (
            <div className="mentionSuggestionsEntryContainer">
                <div className="mentionSuggestionsEntryContainerLeft">
                    <div className="ticker-suggestion-icon">
                        <TypeDollar />
                    </div>
                </div>

                <div className="mentionSuggestionsEntryContainerRight">
                <div className="mentionSuggestionsEntryText">
                    {mention.name}
                </div>

                <div className="mentionSuggestionsEntryTitle">
                    {mention.title}
                </div>
                </div>
            </div>
        )
    }
  
    return (
      <div   {...parentProps} className={"suggestions-wrapper" + " " + classNames({
          "active": isFocused
      })}>

          {renderContent}
        
      </div>
    );
  }
  


class NewPost extends Component {

    constructor(props) {
        super(props);
    
        this.mentionPlugin = createMentionPlugin({
            mentionComponent(mentionProps) {
                let renderContent
                if(mentionProps.mention.type == "user" ){
                    renderContent = (
                        <span
                            className="mention-tag mention-user"
                            onClick={() => props.history.push("/@" + mentionProps.mention.user.username)}
                        >
                            <TypeMention/> <span className="mention-label">{mentionProps.children}</span>
                        </span>
                    )
                } else if(mentionProps.mention.type == "ticker" ){
                    renderContent = (
                        <span
                            className="mention-tag mention-ticker"
                            onClick={() => props.history.push("/$" + mentionProps.mention.ticker.metadata.symbol)}
                        >
                            <TypeDollar/> <span className="mention-label">{mentionProps.children}</span>
                        </span>
                    )
                }
              return (renderContent);
            },
            mentionTrigger: ['@', '$'],
            positionSuggestions: this._positionSuggestions,
          });

        this.linkifyPlugin = createLinkifyPlugin({
            target: '_blank',
            component: (params) => <a {...R.omit(params, ['blockKey'])} />
        });
      }
    
      state = {
        editorState: EditorState.createEmpty(),
        suggestionsOpen: true,
        isActive: true,
        hideText: false
      };

    componentDidMount() {
        if(this.props.item.content) {
            // console.log(JSON.parse(this.props.item.content))
            // let newContent = JSON.parse(this.props.item.content)

            // forEach(newContent.entityMap, function(value, key) {
            //     value.data.mention = fromJS(value.data.mention)
            // })
            // let content = convertFromRaw(newContent)
            const plugins = [this.mentionPlugin, this.linkifyPlugin];

            const decorators = _.flattenDeep(plugins.map((plugin) => plugin.decorators));
            const decorator = new CompositeDecorator( decorators.filter((decorator, index) => index !== 1) );

            this.setState({
                editorState: EditorState.createWithContent(
                    convertFromRaw(JSON.parse(this.props.item.content))
                    , decorator)
            }, () => {
                const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
                const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
                if(value.length == 1) {
                    this.setState({
                        hideText: true
                    })
                }
            })

          
        }
        // console.log(convertFromRaw(this.props.item.content))
	}

    onChange = editorState => {
        this.setState({
          editorState
        });
    };

    onSearchChange = ({ value }) => {
        this.props.getSuggestions(value)
    };
    
    onAddMention = () => {
        // get the mention object selected
        this.props.suggestionsClear()
      };
    
    focus = () => {
        this.editor.focus();
    };

    getValue() {
        const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        // console.log(convertToRaw(this.state.editorState.getCurrentContent()))
        
        const rawEditorContent = convertToRaw(this.state.editorState.getCurrentContent());
        const entityMap = rawEditorContent.entityMap;
        // console.log(EditorState.getCurrentContent())

        let mentions = []
        Object.values(entityMap).map(entity => {
            mentions.push(entity)
        }); 

        let mentionTickers = []
        
        Object.values(mentions).map(mention => {
            if(mention.data.mention.type == "ticker") {
                mentionTickers.push(mention.data.mention.ticker.metadata.symbol)
            }
        }); 

        let mentionUsers = []

        Object.values(mentions).map(mention => {
            if(mention.data.mention.type == "user") {
                mentionUsers.push(mention.data.mention.user._id)
            }
        }); 

        let postItem = {
            content: JSON.stringify(rawEditorContent),
            user: this.props.user,
            linkedTickers: mentionTickers,
            linkedUsers: mentionUsers,
            sentiment: "bullish",
            clientWidth: this.props.clientWidth
        }

        this.props.createPost(postItem, () => {
            this.props.hideDrawer()
            this.props.updateCollection(true)
        })
        
    }

    _positionSuggestions = ({ decoratorRect, popover, state, props }) => {

        // NOTE: decoratorRect has no `x` prop in node environment
 
        const popoverPosition =
          (decoratorRect.x || decoratorRect.left) + popover.offsetWidth;
        const { left, ...restProps } = positionSuggestions({
          decoratorRect,
          popover,
          state: { 
              isActive: true
        },
          props
        });
    
        let adjustedLeft = null;
        if (popoverPosition > window.innerWidth) {
          adjustedLeft = `${parseFloat(left) -
            popoverPosition % window.innerWidth}px`;
        }
    
        return {
          left: left,
          position: "absolute",
          zIndex: "100",
          boxShadow: "0 5px 24px 0 rgba(23,32,38,0.13)",
          borderRadius: "5px",
          padding: "5px",
          borderRadius: "6px",
          ...restProps
        };
    };

    getPostTime() {
        let date =  moment(this.props.item.createdAt).startOf('hour').fromNow( updateLocale("en", {
            relativeTime: {
              future: "in %s",
              past: "%s ",
              s: "sec",
              m: "%d m",
              mm: "%d m",
              h: "%d h",
              hh: "%d h",
              d: "%d d",
              dd: "%d d",
              M: "a mth",
              MM: "%d mths",
              y: "y",
              yy: "%d y"
            }
        }))

        return(date.replace(/\s/g, ''))
    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin, this.linkifyPlugin];

        


        return (


                <div className="editor">

                    <div className="wall-post-avatar">

                        <Avatar user={this.props.item.user} mini={true}/>

                        <div className="post-avatar-details">
                            <div className="wall-post-avatar-username">
                                {this.props.item.user.username} 
                                <span className="post-avatar-divider">●</span>
                                <span className="post-avatar-time">{this.getPostTime()}</span>
                            </div>
                            {/* <div className="post-avatar-subtitle">
                                <div className="post-avatar-time">{this.getPostTime()} </div>
                                <div className="post-avatar-divider">●</div>
                                <div className="post-avatar-sentiment sentiment-bullish">Bullish</div>
                            </div> */}
                        </div>

                        <div className="post-actions">
                            <Button 
                                minimal="true"
                                icon="more"
                                className={"control theme-"+ this.props.theme}
                                onClick={() =>  {
                                    this.props.showDrawer("post-actions", { post: this.props.item })
                                    }
                                }
                            />
                        </div>
                    </div>

                    {this.props.item && this.props.item.linkedImages && <ImageDisplay images={this.props.item.linkedImages}/>}

                    {!this.state.hideText  && <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        readOnly
                        plugins={plugins}
                        ref={element => {
                            this.editor = element;
                        }}
                        placeholder="Share your opinion..."
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
        profileUser: state.profile.user,
        suggestions: state.app.suggestions,
        clientWidth: state.app.clientWidth
    };
}

export default withRouter(connect(mapStateToProps, {
    updateCover,
    updateCoverGradient,
    updateProfile,
    getSuggestions,
    suggestionsClear,
    createPost,
    updateCollection,
    showDrawer
})(NewPost));
