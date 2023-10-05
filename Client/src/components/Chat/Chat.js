import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AttachFile, Close, SearchOutlined } from "@mui/icons-material";
import { useRef } from "react";
import { AccountContext } from "../../context/AccountContext";
import Message from "../Message/Message";
import { getmessage, newmessage, uploadFile } from "../../services/api";
import Emoji from "./Emoji";
import SendIcon from "@mui/icons-material/Send";

import imageicon from "../Message/Icons/img.png";
import csvicon from "../Message/Icons/csv.png";
import pdficon from "../Message/Icons/pdf.png";
import ppticon from "../Message/Icons/ppt.png";
import txticon from "../Message/Icons/txt.png";
import xlicon from "../Message/Icons/xl.png";
import docicon from "../Message/Icons/docx.png";

function Chat({ person }) {
	const {
		loginDetails,
		selectedConversation,
		socket,
		setupdatesidebar,
		currentchat,
		setcurrentchat,
	} = useContext(AccountContext);

	const [activeuser, setactiveuser] = useState(null);
	const [selectedfile, setselectedfile] = useState(null);
	const [replymessage, setreplymessage] = useState(null);

	const usermessage = useRef();
	const scrollchat = useRef();
	const emojislider =useRef()

	const handleSendMessage = async (e) => {
		e.preventDefault();
		let chatdetails = {};
		let message = usermessage.current.value;
		if (selectedfile) {
			const data = new FormData();
			data.append("name", selectedfile.name);
			data.append("file", selectedfile);
			let response = await uploadFile(data);
			if (response.success) {
				chatdetails = {
					reply:replymessage?.message,
					message,
					receiverid: person.sub,
					senderid: loginDetails.sub,
					conversationid: selectedConversation._id,
					filename: response.filedetails.name,
					filemime: response.filedetails.mime,
					fileurl: response.filedetails.url,
					filesize: response.filedetails.size,
				};
			}
			usermessage.current.value = "";
			let newchat = await newmessage(chatdetails);
			socket.current.emit("sendMessage", newchat);
			let chat1 = [...currentchat];
			chat1.push(newchat);
			setcurrentchat(chat1);
			setselectedfile(null);
			setupdatesidebar(true);
			setreplymessage(null)
		} else {
			if (message.length > 0) {
				chatdetails = {
					reply:replymessage?.message,
					message,
					receiverid: person.sub,
					senderid: loginDetails.sub,
					conversationid: selectedConversation._id,
				};

				usermessage.current.value = "";
				let newchat = await newmessage(chatdetails);
				socket.current.emit("sendMessage", newchat);
				let chat1 = [...currentchat];
				chat1.push(newchat);
				setcurrentchat(chat1);
				setselectedfile(null);
				setreplymessage(null);
				emojislider.current.classList.add("hidden");

			}
		}
	};

	const fileChangeHandler = async (e) => {
		const file = e.target.files[0];
		setselectedfile(file);
		usermessage.current.focus();
	};

	//get messge details when the selected user changes
	useEffect(() => {
		setselectedfile(null);
		setreplymessage(null);
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
			
			setupdatesidebar(true);
		};

		socket.current.on("getMessage", messageHandler);
		return () => {
			socket.current.off("getMessage", messageHandler);
		};
	}, [selectedConversation?._id]);

	// Scroll to the bottom of the chat container when messages change
	useEffect(() => {
		if (scrollchat.current) {
			scrollchat.current.scrollTop = scrollchat.current.scrollHeight;
		}
		setupdatesidebar(true);
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
						setreplymessage = {setreplymessage}
						replymessage ={replymessage}
					/>
				))}
			</div>
				
			<div className="chat-footer">
				{selectedfile && (
					<div className="chat-footer-selected-file">
						<div className="chat-footer-selected-file-details">
							{selectedfile.type === "application/pdf" && (
								<img src={pdficon} />
							)}
							{selectedfile.type === "text/csv" && (
								<img src={csvicon} />
							)}
							{selectedfile.type === "text/plain" && (
								<img src={txticon} />
							)}
							{selectedfile.type.startsWith("image/") && (
								<img src={imageicon} />
							)}
							{(selectedfile.type ===
								"application/vnd.ms-excel" ||
								selectedfile.type ===
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (
								<img src={xlicon} />
							)}
							{(selectedfile.type ===
								"application/vnd.ms-powerpoint" ||
								selectedfile.type ===
									"application/vnd.openxmlformats-officedocument.presentationml.presentation") && (
								<img src={ppticon} />
							)}
							{(selectedfile.type === "application/msword" ||
								selectedfile.type ===
									"application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
								<img src={docicon} />
							)}

							{selectedfile.name}
						</div>
						<div className="chat-footer-selected-file-clear">
							<IconButton
								onClick={() => {
									setselectedfile(null);
								}}>
								<Close />
							</IconButton>
						</div>
					</div>
				)}
				<Emoji usermessage={usermessage} emojislider={emojislider} />
				<label htmlFor="inputfile">
					<AttachFile />
				</label>
				<input
					type="file"
					id="inputfile"
					className="hidden"
					onChange={fileChangeHandler}
				/>
				<form onSubmit={(e) => handleSendMessage(e)}>
					<input
						type="text"
						placeholder="Type message.... "
						ref={usermessage}
						id="usermessage"
					/>
				</form>
				<SendIcon />
			</div>
		</div>
	);
}

export default Chat;
