import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import LogoDark from "../logo/dark" 
import LogoLight from "../logo/light" 

class Logo extends Component {

	render() {
		return (
            <div>
                {this.props.theme == "light" ? <LogoLight/> : <LogoDark/>}
            </div>
		);
	}
}

function mapStateToProps(state) {
	return {
        theme: state.app.theme
	};
}

export default connect(mapStateToProps, {})(Logo)