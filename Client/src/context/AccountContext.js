import { useState, createContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";
export const AccountContext = createContext(null);

const AccountState = ({ children }) => {
	const [loginDetails, setLoginDetails] = useState(null);
	const [showPerson, setShowperson] = useState(null);
	const [selectedConversation, setselectedConversation] = useState(null);
	const [updatesidebar,setupdatesidebar]= useState(false);
	
	const socket = useRef();

	useEffect(() => {
		socket.current = io("ws://localhost:9000");
	}, []);
	return (
		<AccountContext.Provider
			value={{
				loginDetails,
				setLoginDetails,
				showPerson,
				setShowperson,
				selectedConversation,
				setselectedConversation,
				socket,
				updatesidebar,setupdatesidebar
			}}>
			{children}
		</AccountContext.Provider>
	);
};

export default AccountState;
