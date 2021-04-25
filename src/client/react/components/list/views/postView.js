import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import {
    EditorState, convertFromRaw, convertToRaw, ContentState, CompositeDecorator ,
} from 'draft-js';

import * as _ from "lodash"

import { fromJS} from 'immutable';
import forEach from 'lodash/forEach';

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

const mentionPlugin = createMentionPlugin();

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, MentionSuggestions];

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
      }
    
      state = {
        editorState: EditorState.createEmpty(),
        suggestionsOpen: true,
        isActive: true
      };

    componentDidMount() {
        if(this.props.item.content) {
            // console.log(JSON.parse(this.props.item.content))
            // let newContent = JSON.parse(this.props.item.content)

            // forEach(newContent.entityMap, function(value, key) {
            //     value.data.mention = fromJS(value.data.mention)
            // })
            // let content = convertFromRaw(newContent)
            const plugins = [this.mentionPlugin];

            const decorators = _.flattenDeep(plugins.map((plugin) => plugin.decorators));
            const decorator = new CompositeDecorator( decorators.filter((decorator, index) => index !== 1) );

            this.setState({
                editorState: EditorState.createWithContent(
                    convertFromRaw(JSON.parse(this.props.item.content))
                    , decorator)
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

        // console.log(postItem)
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

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin];


        return (


                <div className="editor">

                    <div className="post-avatar">
                        <Avatar user={this.props.user} mini={true}/>
                        <div className="post-avatar-username">{this.props.user.username}</div>
                    </div>

                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        readOnly
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
    updateCollection
})(NewPost));
