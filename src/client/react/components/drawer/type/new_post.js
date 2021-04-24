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
        suggestions: [
            {
                type: "user",
                name: "hello",
                user: {"_id":{"$oid":"60822db8e9d09545d899d5fc"},"coverGradient":1,"email":"mikhail2@gmail.com","password":"$2a$10$aN0geE1s/lFp1PyxPDlNUuMofR7nW7RfyPxXcvcsHLLFrFb/LUjB2","created":{"$date":"2021-04-23T02:15:20.725Z"},"__v":0,"avatar":"http://res.cloudinary.com/dcdnt/image/upload/v1619144124/cashmachine/avatars/q6mqhtxvrunb6hilp2ku.png","avatarDefault":true,"username":"hello"},
            },
            {
                type: "user",
                name: "coolmike",
                user: {"_id":{"$oid":"60820fec5f866530ba60aaf1"},"coverGradient":3,"email":"mik@mik.mik","password":"$2a$10$GjEIpv3krVOa3siISvxlROmZTb2dFUlic.BcmQa/Jw7KfokfByivm","created":{"$date":"2021-04-23T00:08:12.714Z"},"__v":0,"avatar":"http://res.cloudinary.com/dcdnt/image/upload/v1619136495/cashmachine/avatars/bjvjqx7uoeoqijlykehe.png","avatarDefault":true,"username":"coolmike","cover":null}
            },
            {
                type: "user",
                name: "machinelord",
                user: {"_id":{"$oid":"6080fa9a9cfd9aa6cb430c17"},"email":"auth@auth.com","password":"$2a$10$WvDxmPVajCEb3owgmhC/AOkLc.fJAxBZ.OOSbBqqj9GcbLbDz0ZnS","created":{"$date":"2021-04-22T04:24:58.311Z"},"__v":0,"avatar":"http://res.cloudinary.com/dcdnt/image/upload/v1619065501/cashmachine/avatars/m1h0am1pdhamlpdcdbmg.png","avatarDefault":true,"username":"machinelord"}
            },
            {
                type: "ticker",
                name: "CCIV",
                ticker: {"_id":{"$oid":"603deeb6da8c3cef41e8b4a5"},"createdAt":{"$date":"2021-03-02T07:52:22.650Z"},"metadata":{"symbol":"CCIV","name":"Churchill Capital Corp"},"__v":0,"last24hours":12,"last48hours":28,"lastWeek":120,"week":[12,16,16,16,21,7,5],"thisWeek":93,"previousWeek":75,"growthRate24":-25,"growthRate48":-12.5,"growthRate72":0,"score":15.344827586206897}
            },
            {
                type: "ticker",
                name: "AAPL",
                ticker: {"_id":{"$oid":"603ee5f8e171545d50e21baf"},"createdAt":{"$date":"2021-03-03T01:27:20.690Z"},"metadata":{"symbol":"AAPL","name":"Apple"},"__v":0,"last48hours":21,"last24hours":9,"lastWeek":51,"week":[9,12,17,13,14,6,6],"thisWeek":77,"previousWeek":95,"growthRate24":-25,"growthRate48":-30,"growthRate72":15.151515151515156,"score":11}
            },
            {
                type: "ticker",
                name: "GSAT",
                ticker: {"_id":{"$oid":"603ee7fae171545d50e21bf9"},"createdAt":{"$date":"2021-03-03T01:35:54.561Z"},"metadata":{"symbol":"GSAT","name":"Globstar"},"__v":0,"last24hours":0,"last48hours":0,"lastWeek":10,"week":[0,0,1,0,0,0,1],"previousWeek":6,"thisWeek":2,"growthRate24":0,"growthRate48":-100,"growthRate72":100,"score":0.27586206896551724} 
            }
        ],
        suggestionsOpen: true,
        isActive: true
      };

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
        });
    };

    onSearchChange = ({ value }) => {
        console.log(value)
        // this.setState({
        //   suggestions: defaultSuggestionsFilter(value, this.state.suggestions)
        // });
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

        let mentions = []
        Object.values(entityMap).map(entity => {
            mentions.push(entity)
        }); 
        console.log(mentions)
        
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
            <div className={"app-drawer-content-container standard-drawer action-drawer theme-" + this.props.theme}>

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
                                placeholder="Share your opinion..."
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
