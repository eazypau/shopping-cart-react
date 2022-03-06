import React from "react";
import ReactDOM from "react-dom";
import "./sass/index.scss";
import App from "./App";
import { StateProvider } from "./ReactState/stateProvider";
import reducer, { initialState } from "./ReactState/reducer";

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
