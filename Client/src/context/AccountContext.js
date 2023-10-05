import { useState, createContext, useRef, useEffect } from "react";
export const AccountContext = createContext(null);

const AccountState = ({ children }) => {
	const [loginDetails, setLoginDetails] = useState(null);
	const [SelectedPerson, setSelectedPerson] = useState(null);
	const [selectedConversation, setselectedConversation] = useState(null);
	const [updatesidebar, setupdatesidebar] = useState(false);
	const [currentchat, setcurrentchat] = useState([]);

	const socket = useRef();

	return (
		<AccountContext.Provider
			value={{
				loginDetails,
				setLoginDetails,
				SelectedPerson,
				setSelectedPerson,
				selectedConversation,
				setselectedConversation,
				socket,
				updatesidebar,
				setupdatesidebar,
				currentchat,
				setcurrentchat,
			}}>
			{children}
		</AccountContext.Provider>
	);
};

export default AccountState;
