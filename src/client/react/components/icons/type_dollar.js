import React, { Component, useCallback, useEffect, useState, useRef, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class TypeDollar extends Component {

	render() {

		return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7"
                height="10"
                viewBox="0 0 7 10"
            >
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <g fill="#4680E6" fillRule="nonzero" transform="translate(-126 -145)">
                    <path d="M132.144 150.944a1.78 1.78 0 00-.281-.525 2.103 2.103 0 00-.47-.438 2.439 2.439 0 00-.655-.3c-.1-.025-.27-.069-.5-.125-.22-.056-.457-.112-.7-.175-.244-.062-.463-.119-.663-.168a7.747 7.747 0 00-.338-.082 1.7 1.7 0 01-.656-.325c-.168-.144-.25-.344-.25-.594 0-.18.044-.33.132-.45.087-.118.2-.212.337-.287.138-.069.287-.119.45-.15.162-.031.325-.05.481-.05.463 0 .844.094 1.144.287.3.188.469.52.506.975h1.338c0-.375-.082-.706-.238-.987a2.19 2.19 0 00-.637-.719 2.976 2.976 0 00-.931-.437 5.2 5.2 0 00-.47-.088v-.681a.627.627 0 00-.624-.625.627.627 0 00-.625.625v.675a3.19 3.19 0 00-.425.081 2.918 2.918 0 00-.9.381 2.128 2.128 0 00-.638.657 1.776 1.776 0 00-.244.937c0 .188.025.369.082.55.056.181.144.35.275.513.131.162.3.306.518.437.22.132.494.238.82.319.53.131.974.237 1.337.325.362.081.675.175.95.262.156.057.3.144.431.275.131.132.2.332.2.607a.997.997 0 01-.088.393.858.858 0 01-.28.344c-.132.1-.294.181-.507.244a2.611 2.611 0 01-.75.094c-.269 0-.525-.031-.756-.088a1.977 1.977 0 01-.619-.268 1.276 1.276 0 01-.419-.476c-.1-.193-.15-.424-.15-.7H126c.006.444.094.825.269 1.15.168.326.4.588.687.794.288.207.619.363 1.007.463a4.7 4.7 0 00.53.1v.681c0 .344.282.625.626.625a.627.627 0 00.625-.625v-.656c.187-.019.381-.05.562-.094.363-.081.688-.213.975-.394.288-.181.519-.412.694-.694.175-.28.263-.625.263-1.025 0-.193-.032-.38-.094-.568z"></path>
                    </g>
                </g>
            </svg>
		);
	}
}

function mapStateToProps({ app }) {
	return {
	};
}

export default connect(mapStateToProps, {})(TypeDollar)