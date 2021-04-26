import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import {
    EditorState, convertFromRaw, convertToRaw, ContentState, CompositeDecorator ,
} from 'draft-js';
import * as _ from "lodash"

import {
    getSuggestions,
    suggestionsClear,
    updateCollection
} from "../../../../redux/actions/appActions"

import {
    updateCover,
    updateCoverGradient,
    updateProfile
} from "../../../../redux/actions/profileActions"

import {
    createPost,
    updatePost
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

import ImageUploader from "../../image_uploader/"
import ImageDisplay from "../../image_display/"

import createLinkifyPlugin from 'draft-js-linkify-plugin';
const mentionPlugin = createMentionPlugin();

const linkifyPlugin = createLinkifyPlugin({
    target: '_blank'  
});

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
                            onClick={() => console.log(mentionProps)}
                        >
                            <TypeMention/> <span className="mention-label">{mentionProps.children}</span>
                        </span>
                    )
                } else if(mentionProps.mention.type == "ticker" ){
                    renderContent = (
                        <span
                            className="mention-tag mention-ticker"
                            onClick={() => console.log(mentionProps)}
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
            target: '_blank'  
        });

        let finalState

        if(props.edit) {

            const plugins = [this.mentionPlugin, this.linkifyPlugin];

            const decorators = _.flattenDeep(plugins.map((plugin) => plugin.decorators));
            const decorator = new CompositeDecorator( decorators.filter((decorator, index) => index !== 1) );

            let content =  EditorState.createWithContent(
                convertFromRaw(JSON.parse(props.drawerData.post.content))
            )
            finalState = content
        } else {
            finalState = EditorState.createEmpty()
        }

        this.state = {
            editorState: finalState,
            suggestionsOpen: true,
            isActive: true,
            postLoaded: false,
            uploadedImages: []
        };
    
      }
    
     
    componentDidMount() {
        this.setState({
            editor: true,
            
        })

        setTimeout(() => {
            this.focus()
        }, 1000)
        
	}

    onChange = editorState => {
        this.setState({
            editorState
        })
    };

    onSearchChange = ({ trigger, value }) => {
        this.props.getSuggestions(value, trigger)
    };
    
    onAddMention = () => {
        // get the mention object selected
        this.props.suggestionsClear()
      };
    
    focus = () => {
        this.editor.focus();
    };

    getValue(update) {
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

        // console.log(postItem)
        if(update) {
            this.props.updatePost(this.props.post._id, postItem, () => {
                this.props.hideDrawer()
                this.props.updateCollection(true)
            })
        } else {
            this.props.createPost(postItem, () => {
                this.props.hideDrawer()
                this.props.updateCollection(true)
            })
        }
        
        
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
          zIndex: "1000",
          boxShadow: "0 5px 24px 0 rgba(23,32,38,0.13)",
          background: "white",
          borderRadius: "5px",
          padding: "5px",
          borderRadius: "6px",
          ...restProps
        };
    };

    addImage(url) {
        let newUploadedImage = [
            ...this.state.uploadedImages,
            url
        ]

        this.setState({
            uploadedImages: newUploadedImage
        })

        console.log(this.state.uploadedImages)

    }

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin, this.linkifyPlugin];

        return (
            <div className={"app-drawer-content-container standard-drawer action-drawer new-post theme-" + this.props.theme}>

                <div className="drawer-action-header">
                    <Button
                        minimal="true"
                        icon="cross"
                        className={"control action-close theme-" + this.props.theme}
                        onClick={() => {
                            this.props.hideDrawer()
                        }
                        }
                    />

                    <div className="drawer-action-title">
                        {this.props.edit ? "Edit post" : "New post"}
                    </div>

                    <Button
                        text={this.props.edit ? "Save" : "Post"}
                        className={"drawer-action-button theme-" + this.props.theme}
                        onClick={() => {
                            let update = this.props.edit ? true : false;
                            this.getValue(update)
                        }
                        }
                    />
                </div>

                <div className="placeholder">
                    {/* {this.state.editor && <SimpleMentionEditor onChange={(values) => console.log(values)}/>} */}

                    {this.state.editor && this.props.user &&  <div  className="editor editing">
                            <div className="editor-container" onClick={this.focus}>
                                <div className="post-avatar">
                                    <Avatar user={this.props.user} mini={true}/>
                                    <div className="post-avatar-username">{this.props.user.username}</div>
                                </div>

                                <ImageDisplay images={this.state.uploadedImages} />

                                <Editor
                                    editorState={this.state.editorState}
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    ref={element => {
                                        this.editor = element;
                                    }}
                                    placeholder="Share your opinion..."
                                />
                                
                                <MentionSuggestions
                                    onSearchChange={this.onSearchChange}
                                    suggestions={this.props.suggestions}
                                    onAddMention={this.onAddMention}
                                    open={this.state.suggestionsOpen}
                                    onOpenChange={(value) => {
                                        this.setState({
                                            suggestionsOpen: value
                                        })
                                        if(!value) {
                                            this.props.suggestionsClear()
                                        }
                                    }}
                                    entryComponent={Entry}
                                />
                            </div>

                            <div className="post-helper-bar">
                                <ul>
                                    <li>
                                        <ImageUploader addImage={(url) => {
                                            console.log(url)
                                            this.addImage(url)
                                        }}/>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    }

                    
                </div>
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
        clientWidth: state.app.clientWidth,
        drawerData: state.app.drawerData
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
    updatePost
})(NewPost));
