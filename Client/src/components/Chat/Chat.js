import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	AttachFile,
	InsertEmoticon,
	Mic,
	SearchOutlined,
} from "@mui/icons-material";
import { useRef } from "react";
import { AccountContext } from "../../context/AccountContext";
import Message from "../Message/Message";
import { getmessage, newmessage } from "../../services/api";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
function Chat({ person }) {
	const usermessage = useRef();
	const { loginDetails, selectedConversation, socket } =
		useContext(AccountContext);
	const [currentchat, setcurrentchat] = useState([]);
	const [activeuser, setactiveuser] = useState(null);
	const scrollchat = useRef();
	const handleSendMessage = async (e) => {
		e.preventDefault();
		const chatdetails = {
			message: usermessage.current.value,
			receiverid: person.sub,
			senderid: loginDetails.sub,
			type: "text",
			conversationid: selectedConversation._id,
		};
		usermessage.current.value = "";

		let newchat = await newmessage(chatdetails);
		socket.current.emit("sendMessage", newchat);
		let chat1 = [...currentchat];
		chat1.push(newchat);
		setcurrentchat(chat1);
	};

	useEffect(() => {
		const getmessagedetails = async () => {
			let chatdata = await getmessage(selectedConversation._id);
			setcurrentchat(chatdata);
		};
		if (selectedConversation) {
			selectedConversation._id && getmessagedetails();
		}
	}, [selectedConversation]);

	//add current online user to socket
	useEffect(() => {
		socket.current.emit("adduser", loginDetails);
		socket.current.on("getuser", (user) => {
			setactiveuser(user);
		});
		// eslint-disable-next-line
	}, [loginDetails]);

	//receive message
	useEffect(() => {
		const messageHandler = (message) => {
			if (message.conversationid === selectedConversation._id) {
				setcurrentchat((prevMessages) => [...prevMessages, message]);
			}
		};

		socket.current.on("getMessage", messageHandler);

		return () => {
			socket.current.off("getMessage", messageHandler);
		};
	}, [selectedConversation?._id]);

	useEffect(() => {
		// Scroll to the bottom of the chat container when messages change
		if (scrollchat.current) {
			scrollchat.current.scrollTop = scrollchat.current.scrollHeight;
		}
	}, [currentchat]);


	const toggleEmojiSlider = () => {
		 document.getElementById("emojislider")?.classList.toggle("hidden");
	};

	const addemoji =(e)=>{
		const value = usermessage.current.value;
		usermessage.current.value=value+e.native;
		document.getElementById("usermessage").focus();
	}


	return (
		<div className="chat">
			<div className="chat-header">
				<Avatar src={person.picture} />
				<div className="chat-header-info">
					<h3>{person.name}</h3>
					<span>
						{activeuser?.find((user) => user.sub === person.sub)
							? "Online"
							: "Offline"}
					</span>
				</div>

				<div className="chat-header-right">
					<IconButton>
						<SearchOutlined />
					</IconButton>
					<IconButton>
						<AttachFile />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

			<div className="chat-body" ref={scrollchat}>
				{currentchat?.map((e, i) => (
					<Message
						details={e}
						user={loginDetails.sub}
						key={i}
						person={person}
					/>
				))}
			</div>

			<div className="chat-footer">
				<InsertEmoticon onClick={toggleEmojiSlider} />
				<div className="chat-emoji-slider hidden" id="emojislider">
					<Picker data={data} onEmojiSelect={addemoji} theme="light" />
				</div>
				<label htmlFor="inputfile">
					<AttachFile />
				</label>
				<input type="file" id="inputfile" className="hidden" />
				<form onSubmit={(e) => handleSendMessage(e)}>
					<input
						type="text"
						placeholder="Type message.... "
						ref={usermessage}
						id="usermessage"
					/>
					<button type="submit"> send message</button>
				</form>
				<Mic />
			</div>
		</div>
	);
}

export default Chat;
