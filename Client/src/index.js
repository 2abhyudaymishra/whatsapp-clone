import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AccountState from "./context/AccountContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AccountState>
			<App />
		</AccountState>
	</React.StrictMode>
);
