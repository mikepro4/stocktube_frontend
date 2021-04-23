import React, { ReactElement, useRef, useMemo, useState, useCallback, Component } from 'react';
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent, Position, Toaster } from "@blueprintjs/core";

import {
    convertToRaw,
} from 'draft-js';

import * as _ from "lodash"

import {
    updateCover,
    updateCoverGradient,
    updateProfile
} from "../../../../redux/actions/profileActions"


import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from '@draft-js-plugins/mention';

import Portal from "react-portal";
import positionSuggestions from "draft-js-mention-plugin/lib/utils/positionSuggestions";

// import mentionsStyles from './MentionStyles.scss';

// const mentionStyles = {
//     mentionSuggestions: {
//         background: "red"
//     }
// }

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
  
    return (
      <div  {...parentProps}>
        <div className="mentionSuggestionsEntryContainer">
            <div className="mentionSuggestionsEntryContainerLeft">
            <img
                src={mention.avatar}
                className="mentionSuggestionsEntryAvatar"
                role="presentation"
            />
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
      </div>
    );
  }
  


class NewPost extends Component {

    constructor(props) {
        super(props);
    
        this.mentionPlugin = createMentionPlugin({
            mentionComponent(mentionProps) {
              return (
                <span
                  className={mentionProps.className}
                  // eslint-disable-next-line no-alert
                  onClick={() => console.log(mentionProps)}
                >
                  {mentionProps.children}
                </span>
              );
            },
            mentionTrigger: ['@', '$'],
            positionSuggestions: this._positionSuggestions,
          });
      }
    
      state = {
        editorState: EditorState.createEmpty(),
        suggestions: [
            {
              name: "Matthew Russell",
              link: "https://twitter.com/mrussell247",
              avatar:
                "https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg"
            },
            {
              name: "Julian Krispel-Samsel",
              link: "https://twitter.com/juliandoesstuff",
              avatar: "https://avatars2.githubusercontent.com/u/1188186?v=3&s=400"
            },
            {
              name: "Jyoti Puri",
              link: "https://twitter.com/jyopur",
              avatar: "https://avatars0.githubusercontent.com/u/2182307?v=3&s=400"
            },
            {
              name: "Max Stoiber",
              link: "https://twitter.com/mxstbr",
              avatar:
                "https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg"
            },
            {
              name: "Nik Graf",
              link: "https://twitter.com/nikgraf",
              avatar: "https://avatars0.githubusercontent.com/u/223045?v=3&s=400"
            },
            {
              name: "Pascal Brandt",
              link: "https://twitter.com/psbrandt",
              avatar:
                "https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png"
            }
        ],
        suggestionsOpen: false,
        isActive: true
      };

    componentDidMount() {
        this.setState({
            editor: true,
            
        })
    }

    onChange = editorState => {
        this.setState({
          editorState
        });
    };

    onSearchChange = ({ value }) => {
        this.setState({
          suggestions: defaultSuggestionsFilter(value, this.state.suggestions)
        });
    };
    
    onAddMention = () => {
        // get the mention object selected
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

        Object.values(entityMap).map(entity => {
            console.log(entity.data.mention);
        }); 
        
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
          ...restProps
        };
      };

    render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin];


        return (
            <div className={"app-drawer-content-container standard-drawer theme-" + this.props.theme}>

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
                        New post
                        </div>

                    <Button
                        text="Post"
                        className={"drawer-action-button theme-" + this.props.theme}
                        onClick={() => {
                            // this.props.hideDrawer()
                            this.getValue()
                        }
                        }
                    />
                </div>

                <div className="placeholder">
                    {/* {this.state.editor && <SimpleMentionEditor onChange={(values) => console.log(values)}/>} */}

                    {this.state.editor &&  <div onClick={this.focus} className="editor">
                            <Editor
                                editorState={this.state.editorState}
                                onChange={this.onChange}
                                plugins={plugins}
                                ref={element => {
                                    this.editor = element;
                                }}
                            />
                            <MentionSuggestions
                                onSearchChange={this.onSearchChange}
                                suggestions={this.state.suggestions}
                                onAddMention={this.onAddMention}
                                open={this.state.suggestionsOpen}
                                onOpenChange={(value) => {
                                    console.log(value)
                                    this.setState({
                                        suggestionsOpen: value
                                    })
                                }}
                                entryComponent={Entry}
                            />
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
    };
}

export default withRouter(connect(mapStateToProps, {
    updateCover,
    updateCoverGradient,
    updateProfile
})(NewPost));
