import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import classNames from "classnames"
import moment from 'moment'
import { Button } from "@blueprintjs/core";

import {
    convertFromRaw,
} from 'draft-js';

import * as _ from "lodash"

import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';

import TypeDollar from "../../icons/type_dollar"
import TypeMention from "../../icons/type_mention"
import Avatar from "./../../avatar"

import createMentionPlugin, {
  } from '@draft-js-plugins/mention';

const mentionPlugin = createMentionPlugin();

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, MentionSuggestions];

class PostView extends Component {
    constructor(props) {
        super(props);

        this.mentionPlugin = createMentionPlugin({
            mentionComponent(mentionProps) {
                let renderContent
                console.log(mentionProps)
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
          });
    
    }

    state = {
        editorState: EditorState.createEmpty(),
        loading: false,
        isActive: true
    }

	componentDidMount() {
        if(this.props.item.content) {
            // console.log(JSON.parse(this.props.item.content))
            let newContent = JSON.parse(this.props.item.content)
            let content = convertFromRaw(newContent)
            this.setState({
                editorState: EditorState.createWithContent(content)
            })
        }
        // console.log(convertFromRaw(this.props.item.content))
	}

	componentWillUnmount() {
	}

	componentDidUpdate(prevprops) {

	}

	render() {
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin];
		return (
			<div>
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
                <Editor
                    editorState={this.state.editorState}
                    readOnly={true}
                    onChange={() => {}}
                    plugins={plugins}
                    ref={element => {
                        this.editor = element;
                    }}
                    placeholder="Share your opinion..."
                />
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.app.user,
        location: state.router.location,
        app: state.app
	};;
}

export default connect(mapStateToProps, {
})(withRouter(PostView));
