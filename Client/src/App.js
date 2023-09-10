import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Loginpage/Login";
import "./App.css";
import { AccountContext } from "./context/AccountContext";
import { useContext, useEffect, useState } from "react";
import EmptyChat from "./components/Chat/EmptyChat";
import Broadcast from "./components/Broadcast/Broadcast";
import { getusers } from "./services/api";
function App() {
	const {loginDetails,showPerson} =useContext(AccountContext);
	const [ShowBroadcast,setShowBroadcast]=useState(false);
	const [busers, setbusers] = useState([]);
	useEffect(() => {
		const fetchuser = async () => {
			const getuser = await getusers();
			setbusers(getuser);
		};
		fetchuser();
	}, []);

	return (
		<div className="app">
			{!loginDetails ? (
				<Login />
			) : (
				<div className="whatsapp">
					<div className="whatsapp-body">
						{ShowBroadcast?<Broadcast setShowBroadcast={setShowBroadcast} busers={busers}/>:""}
						<Sidebar setShowBroadcast={setShowBroadcast}  ShowBroadcast={ShowBroadcast}/>
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
