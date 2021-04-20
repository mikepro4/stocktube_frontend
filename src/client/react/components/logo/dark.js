import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Logo extends Component {

	render() {

		return (
            <Link to="/" className="logo">
               <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="49"
                    height="35"
                    viewBox="0 0 49 35"
                    >
                    <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                        <g transform="translate(-25 -17)">
                        <g transform="translate(25 17)">
                            <path fill="#FFF" d="M12.419 6.774H35V31.613H12.419z"></path>
                            <g fill="#FAFF00" transform="translate(.643 .643)">
                            <path d="M5.898 2.575C11.579.924 17.453.067 23.518.003c6.06-.063 11.881.768 17.464 2.492a7.345 7.345 0 015.103 5.903c.416 2.727.603 5.658.562 8.794a72.569 72.569 0 01-.598 8.556 7.35 7.35 0 01-5.863 6.234c-5.18 1.03-10.736 1.546-16.668 1.546-6.016 0-11.689-.53-17.017-1.59A7.35 7.35 0 01.663 25.87a55.082 55.082 0 01-.66-9.107c.032-2.943.261-5.718.686-8.324a7.346 7.346 0 015.209-5.865zM20.98 25.574l7.422-9.018c1.084-1.287.162-3.264-1.56-3.422l-2.04-.003 1.569-4.05c.546-1.647-1.55-2.982-2.728-1.555l-6.774 8.03c-.959 1.348-.154 3.174 1.485 3.174h2.425l-2.216 5.488-.045.14c-.15.602.112 1.216.602 1.546.6.404 1.4.288 1.86-.33z"></path>
                            </g>
                            <path
                            fill="#FAFF00"
                            fillRule="nonzero"
                            d="M7.282 4.546A6.34 6.34 0 002.757 9.63c-.392 2.438-.603 5.035-.633 7.79-.032 2.847.17 5.69.608 8.527a6.344 6.344 0 005.062 5.254c5.137 1.003 10.608 1.506 16.412 1.506 5.72 0 11.074-.488 16.065-1.462a6.343 6.343 0 005.084-5.398c.332-2.55.517-5.228.555-8.036.039-2.936-.133-5.68-.515-8.23a6.34 6.34 0 00-4.436-5.123c-5.352-1.624-10.931-2.406-16.742-2.346-5.83.06-11.474.871-16.935 2.433zm-.586-2.028C12.342.904 18.176.066 24.196.003c6.025-.062 11.82.75 17.381 2.438a8.453 8.453 0 015.916 6.83c.399 2.667.578 5.523.537 8.569a71.446 71.446 0 01-.573 8.28 8.458 8.458 0 01-6.778 7.197c-5.13 1-10.62 1.5-16.473 1.5-5.938 0-11.545-.514-16.82-1.545a8.459 8.459 0 01-6.75-7.004 54.302 54.302 0 01-.633-8.87c.032-2.856.251-5.556.66-8.1a8.455 8.455 0 016.033-6.78z"
                            ></path>
                            <path
                            fill="#000"
                            fillRule="nonzero"
                            d="M29.536 16.605c.519-.606.086-1.645-.864-1.732h-3.544l2.16-5.54c.173-.52-.518-1.04-.95-.52l-6.916 8.138c-.432.606-.086 1.472.692 1.472h4.063l-2.853 7.013c-.086.346.346.692.605.346l7.607-9.177zm-5.88 10.439a2.462 2.462 0 01-3.362.583 2.518 2.518 0 01-1.055-2.7l.036-.144 1.724-4.238h-.885c-2.585 0-3.85-2.85-2.447-4.816l.11-.142 6.902-8.121c1.994-2.398 5.543-.153 4.65 2.529l-.036.1-1.036 2.656h.415l.197.01c2.592.235 3.994 3.218 2.32 5.198l-7.533 9.085z"
                            ></path>
                        </g>
                        </g>
                    </g>
                    </svg>
                
            </Link>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default connect(mapStateToProps, {})(Logo)