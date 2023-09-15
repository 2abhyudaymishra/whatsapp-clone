import React from "react";
import "./Message.css";
import TopicIcon from '@mui/icons-material/Topic';
export default function Message({details,user}) {
	const formatdate = (date) => {
		const hours = new Date(date).getHours();
		const mins = new Date(date).getMinutes();
		return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
	  }

	return (
		<>
			{details.type ==="text" && 
			(<p className={ user===details.senderid?"chat-receiver chat-message":"chat-message" }> 
			<div className="message-text">
			{details.message}
			</div>
				<div className="chat-time">
					{formatdate(details.createdAt)}
				</div>
			</p>)
			}
			{details.type ==="file" && 
			(<p className={ user===details.senderid?"chat-receiver chat-message":"chat-message" }> 
				<a href={`${details.message}`} target="_blank" rel="noreferrer"> 
				<TopicIcon/>
				{details.message.substr(46)}
				</a>
				<div className="chat-time">
					{formatdate(details.createdAt)}
				</div>
			</p>)
			}
				

		</>
	);
}
