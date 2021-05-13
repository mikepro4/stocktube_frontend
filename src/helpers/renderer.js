import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import serialize from "serialize-javascript";
import Router from "../client/router";
import { ConnectedRouter, push } from "connected-react-router";

export default (
	expressRequest,
	reduxStore,
	buildAssets,
	routerContext = {},
	history
) => {

	const injectAssets = assets => {
		const assetNameWeights = {
			manifest: 1,
			vendor: 2,
			bundle: 3
		};


		return Object.entries(assets)
			.sort((firstElement, secondElement) => {
				if (
					assetNameWeights[firstElement[0]] < assetNameWeights[secondElement[0]]
				)
					return -1;
				else if (
					assetNameWeights[firstElement[0]] ===
					assetNameWeights[secondElement[0]]
				)
					return 0;
				return 1;
			})
			.reduce((accumulatorString, currentElement) => {
				if(currentElement[0] == "vendor" || currentElement[0] == "bundle"  || currentElement[0] == "manifest" ) {
					accumulatorString += `<script src='/${currentElement[1].js}'></script>`;

					return accumulatorString;
				} else return ""
			}, "");
	};
	// reduxStore.dispatch(push(expressRequest.path));

	const content = renderToString(
		<Provider store={reduxStore}>
			<ConnectedRouter history={history}>
				<div>{renderRoutes(Router)}</div>
			</ConnectedRouter>
		</Provider>
	);

	const helmetInstance = Helmet.renderStatic();
	const html = `
    <html lang="en">
      <head>
        ${helmetInstance.title.toString()}
		${helmetInstance.meta.toString()}
		<script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>

        <link rel="stylesheet" href="/${buildAssets.bundle.css}">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body id="body">
        <div id="app">${content}</div>
        <script>window.INITIAL_STATE= ${serialize(
					reduxStore.getState()
				)}
				window.BASE_API_URL = ${process.env.BASE_API_URL && `"${process.env.BASE_API_URL}"`}
				
				</script>

				${injectAssets(buildAssets)}
      </body>
    </html>
  `;

	return html;
};