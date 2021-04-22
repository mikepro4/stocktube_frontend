import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames"
import { Icon, Button, Classes, Intent  } from "@blueprintjs/core";

class TabBar extends Component {

	render() {

        let tabClasses = classNames({
            "tab-container": true,
        });

		return (
            <div className={tabClasses}>
                <ul className="tab-list">
                    {this.props.tabs.map((tab, i) => {
                        return (
                            <li key={tab} className={classNames("tab-link-container", {
                                    "tab-link-active": (i + 1).toString() == this.props.activeTab
                                })}
                            >
                                <div className="tab-link-wrapper" onClick={() => {
                                        if((i + 1).toString() !== this.props.activeTab) {
                                            this.props.onTabChange(i+1)
                                        }
                                    }
                                }>
                                    <span>{tab}</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {
})(TabBar);
