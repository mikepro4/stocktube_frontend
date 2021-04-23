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

const mentionPlugin = createMentionPlugin();

const { MentionSuggestions } = mentionPlugin;

const plugins = [mentionPlugin, MentionSuggestions];

const mentions = [
    {
      name: 'Matthew Russell',
      link: 'https://twitter.com/mrussell247',
      avatar:
        'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
      name: 'Julian Krispel-Samsel',
      link: 'https://twitter.com/juliandoesstuff',
      avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },
    {
      name: 'Jyoti Puri',
      link: 'https://twitter.com/jyopur',
      avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
      name: 'Max Stoiber',
      link: 'https://twitter.com/mxstbr',
      avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
    },
    {
      name: 'Nik Graf',
      link: 'https://twitter.com/nikgraf',
      avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
      name: 'Pascal Brandt',
      link: 'https://twitter.com/psbrandt',
      avatar:
        'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
]

function SimpleMentionEditor() {
    const ref = useRef(null);
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState(mentions);
  
    const { MentionSuggestions, plugins } = useMemo(() => {
      const mentionPlugin = createMentionPlugin();
      // eslint-disable-next-line no-shadow
      const { MentionSuggestions } = mentionPlugin;
      // eslint-disable-next-line no-shadow
      const plugins = [mentionPlugin];
      return { plugins, MentionSuggestions };
    }, []);
  
    const onOpenChange = useCallback((_open) => {
      setOpen(_open);
    }, []);
    const onSearchChange = useCallback(({ value }) => {
      setSuggestions(defaultSuggestionsFilter(value, mentions));
    }, []);
  
    return (
      <div
        className="editor"
        onClick={() => {
        }}
      >
        <Editor
          editorKey={'editor'}
          editorState={editorState}
          onChange={setEditorState}
          plugins={plugins}
          ref={ref}
        />
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={(value) => {
              console.log(value)
            // get the mention object selected
          }}
        />
      </div>
    );
  }

class NewPost extends Component {

    // state = {
    //     editor: false,
    //     mentions: [
    //         {
    //           name: 'Matthew Russell',
    //           link: 'https://twitter.com/mrussell247',
    //           avatar:
    //             'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    //         },
    //         {
    //           name: 'Julian Krispel-Samsel',
    //           link: 'https://twitter.com/juliandoesstuff',
    //           avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    //         },
    //         {
    //           name: 'Jyoti Puri',
    //           link: 'https://twitter.com/jyopur',
    //           avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    //         },
    //         {
    //           name: 'Max Stoiber',
    //           link: 'https://twitter.com/mxstbr',
    //           avatar: 'https://avatars0.githubusercontent.com/u/7525670?s=200&v=4',
    //         },
    //         {
    //           name: 'Nik Graf',
    //           link: 'https://twitter.com/nikgraf',
    //           avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    //         },
    //         {
    //           name: 'Pascal Brandt',
    //           link: 'https://twitter.com/psbrandt',
    //           avatar:
    //             'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    //         },
    //       ]
    // }

    componentDidMount() {
        this.setState({
            editor: true,
        })


    }

    state = { editorState: EditorState.createEmpty() }

    onChange = editorState => this.setState({editorState})

    getValue() {
        const blocks = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
        const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
        console.log(value)
        // console.log(EditorState.getCurrentContent())
    }
    
  

    render() {
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

                    {this.state.editor && <Editor
                        editorState={this.state.editorState}
                        onChange={editorState => this.onChange(editorState)}
                        placeholder="Write a tweet..."
                        ref="editor"
                        spellCheck={true}
                        plugins={plugins}
                    />}
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
