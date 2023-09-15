import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	AttachFile,
	Mic,
	SearchOutlined,
} from "@mui/icons-material";
import { useRef } from "react";
import { AccountContext } from "../../context/AccountContext";
import Message from "../Message/Message";
import { getmessage, newmessage, uploadFile } from "../../services/api";
import Emoji from "./Emoji";


function Chat({ person }) {
	const usermessage = useRef();
	const { loginDetails, selectedConversation, socket,setupdatesidebar } =
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
		setupdatesidebar(true);
	};

	const fileSendHandler = async(e)=>{
		const file = e.target.files[0];
		usermessage.current.value = file.name;
		if(file){
			const data = new FormData();
			data.append("name",file.name);
			data.append("file",file);
			let response = await uploadFile(data);

			const chatdetails = {
				message: response.imageurl,
				receiverid: person.sub,
				senderid: loginDetails.sub,
				type: "file",
				conversationid: selectedConversation._id,
			};
			console.log(chatdetails);
			let newchat = await newmessage(chatdetails);
			socket.current.emit("sendMessage", newchat);
			let chat1 = [...currentchat];
			chat1.push(newchat);
			setcurrentchat(chat1);
			setupdatesidebar(true);
		}
	}

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
					<Emoji usermessage={usermessage} />
				<label htmlFor="inputfile">
					<AttachFile />
				</label>
				<input type="file" id="inputfile" className="hidden" onChange={fileSendHandler}/>
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
