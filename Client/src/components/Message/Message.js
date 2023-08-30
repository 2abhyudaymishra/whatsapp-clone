import React from "react";
import "./Message.css";
export default function Message({details,user}) {
	const formatdate = (date) => {
		const hours = new Date(date).getHours();
		const mins = new Date(date).getMinutes();
		return `${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}`;
	  }
	  
	return (
		<p className={ user===details.senderid?"chat-receiver chat-message":"chat-message" }>
			{details.message}
			<span className="chat-time">
				{formatdate(details.createdAt)}
			</span>
		</p>
	);
}
