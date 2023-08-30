import React, { useContext ,useEffect, useState} from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { AccountContext } from "../../context/AccountContext";
import { setConversation } from "../../services/api";

function SidebarChat({ userdetails }) {

	const { picture, name, sub } = userdetails;
	const { setShowperson, loginDetails, setselectedConversation,selectedConversation } =useContext(AccountContext);
	const [con, setcon] = useState({});
	const showuser = async () => {
		setShowperson(userdetails);
		let conversation = await setConversation({
			senderid: loginDetails.sub,
			receiverid: sub,
		});
		setselectedConversation(conversation.details);
	};

	useEffect(  () => {
		 
		const conversation = async ()=>{
			const data= await setConversation({
			   senderid: loginDetails.sub,
			   receiverid: sub,
		   });
		   setcon(data.details);
		}
		conversation();
	}, [selectedConversation]);
	
	return (
		<div className="sidebar-chat" onClick={() => showuser()}>
			<Avatar src={picture} />
			<div className="sidebar-chat-info">
				<h2>{name}</h2>
				<p>{con.message}</p>
			</div>
		</div>
	);
}

export default SidebarChat;
