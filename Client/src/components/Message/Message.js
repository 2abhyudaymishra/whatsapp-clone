import React from "react";
import "./Message.css";
import TopicIcon from "@mui/icons-material/Topic";
import imageicon from "./Icons/img.png";
import csvicon from "./Icons/csv.png";
import pdficon from "./Icons/pdf.png";
import ppticon from "./Icons/ppt.png";
import txticon from "./Icons/txt.png";
import xlicon from "./Icons/xl.png";
import docicon from "./Icons/docx.png";
import ReplyIcon from '@mui/icons-material/Reply';
import { IconButton } from "@mui/material";

export default function Message({ details, user,setreplymessage,replymessage }) {
	const formatdate = (date) => {
		const hours = new Date(date).getHours();
		const mins = new Date(date).getMinutes();
		return `${hours < 10 ? "0" + hours : hours}:${
			mins < 10 ? "0" + mins : mins
		}`;
	};

	const messagereply=()=>{
		if(details.message){
			let replydetails = {
				message : details.message,
				id : details._id
			}
			setreplymessage(replydetails);
		}
		else if(details.filemime){
			let replydetails = {
				message : details.filename,
				id : details._id
			}
			setreplymessage(replydetails);
		}
	}
	return (
		<>
			<div
				className={(user === details.senderid? "chat-receiver chat-message": "chat-message") } 
				{...(details._id === replymessage?.id && { className: " chat-message darkenmessage" })}
				>
				<div className="chat-message-details">
				{details.reply && (
					<div className="chat-reply-message">
						{details.reply}
						</div>
				)}
					

					{details.fileurl && (
						<a
							href={`${details.fileurl}`}
							target="_blank"
							rel="noreferrer">
							{details.filemime === "application/pdf" && (
								<img src={pdficon} />
							)}
							{details.filemime === "text/csv" && (
								<img src={csvicon} />
							)}
							{details.filemime === "text/plain" && (
								<img src={txticon} />
							)}
							{details.filemime.startsWith("image/") && (
								<img src={imageicon} />
							)}
							{(details.filemime === "application/vnd.ms-excel" ||
								details.filemime ===
									"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") && (
								<img src={xlicon} />
							)}
							{(details.filemime ===
								"application/vnd.ms-powerpoint" ||
								details.filemime ===
									"application/vnd.openxmlformats-officedocument.presentationml.presentation") && (
								<img src={ppticon} />
							)}
							{(details.filemime === "application/msword" ||
								details.filemime ===
									"application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
								<img src={docicon} />
							)}

							{details.filename}
						</a>
					)}
					{details.message && (
						<div className="message-text">{details.message}</div>
					)}
				</div>
				<div className="chattime-and-reply">
					<div className="chat-reply-button">
						{ (user !== details.senderid) &&  (<IconButton onClick={messagereply}>
							<ReplyIcon/>
						</IconButton>)}
						
					</div>
					<div className="chat-time">{formatdate(details.createdAt)}</div>
				</div>
			</div>
		</>
	);
}
