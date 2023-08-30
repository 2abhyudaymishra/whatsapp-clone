import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Loginpage/Login";
import "./App.css";
import { AccountContext } from "./context/AccountContext";
import { useContext } from "react";
import EmptyChat from "./components/Chat/EmptyChat";
function App() {
	const {loginDetails,showPerson} =useContext(AccountContext);
	return (
		<div className="app">
			{!loginDetails ? (
				<Login />
			) : (
				<div className="whatsapp">
					<div className="whatsapp-body">
						<Sidebar/>
						{
							showPerson?<Chat person={showPerson}/>:<EmptyChat/>
						}
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
