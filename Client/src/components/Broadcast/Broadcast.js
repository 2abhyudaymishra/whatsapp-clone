import React, { useContext, useEffect, useState } from "react";
import "./Broadcast.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Avatar, IconButton } from "@mui/material";
import Emoji from "../Chat/Emoji";
import { useRef } from "react";
import { AccountContext } from "../../context/AccountContext";
import { broadcastAmessage, getusers, newmessage } from "../../services/api";
import { Socket } from "socket.io-client";
export default function Broadcast({setShowBroadcast,busers}) {
	const broadcastmessage = useRef();
	const { loginDetails,socket,currentchat,setcurrentchat,selectedConversation,setupdatesidebar } =  useContext(AccountContext);
	const [userlist, setuserslist] = useState([]);

	const slider = useRef();

	const handlebroadcastuser = (value) => {
		const exist = userlist.find((e) => e === value);

		if (exist) {
			let users = [...userlist];
			let removed = users.filter((e) => e !== value);
			setuserslist(removed);
		} else {
			setuserslist([...userlist, value]);
		}
	};
	const sendbmessage = async(e) => {
		e.preventDefault();
    if(userlist.length===0){
      alert("Please select atleast one user");
    }
    else{

      const broadcastinfo = {
        receivers:userlist,sender:loginDetails.sub
      }
      const data = await broadcastAmessage(broadcastinfo);
	  if(data.success){
		  const conversationids = data.conversationIds;
		  for(let i=0 ;i<userlist.length; i++){
			const messagedetails = {
				senderid:loginDetails.sub,
				receiverid : userlist[i],
				message : broadcastmessage.current.value,
				conversationid : conversationids[i],
			}
			let newchat = await newmessage(messagedetails);
			socket.current.emit("sendMessage", newchat);
			if(conversationids[i] == selectedConversation?._id){
				let chat1 = [...currentchat];
				chat1.push(newchat);
				setcurrentchat(chat1);
			}
		}
		setupdatesidebar(true);
		setShowBroadcast(false);
		}
		else{
			alert("An error occured while broadcasting messaging");
			setShowBroadcast(false);
	  }
    }
	};
	return (
		<div className="broadcast-container">
			<div className="broadcast">
				<div className="broadcast-header">
					<h2>Broadcast your message</h2>
					<IconButton onClick={()=>setShowBroadcast(false)}>
						<ClearIcon />
					</IconButton>
				</div>

				<div className="broadcast-footer">
					<div className="broadcast-chats">
						{
							// eslint-disable-next-line
							busers?.map((e, i) => {
								if (e.sub !== loginDetails.sub) {
									return (
										<div className="broadcast-chat" key={i}>
											<Avatar src={e.picture} />
											<h2>{e.name}</h2>

											<input
												type="checkbox"
												name="broadcast-select"
												onChange={() =>
													handlebroadcastuser(e.sub)
												}
											/>
										</div>
									);
								}
							})
						}
					</div>

					<div className="broadcast-footer-messageInput">
						<Emoji usermessage={broadcastmessage} emojislider={slider}/>
						<form onSubmit={(e) => sendbmessage(e)}>
							<input
								type="text"
								id="broadcastmessage"
								ref={broadcastmessage}
								placeholder="Type your message"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
