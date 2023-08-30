import React from "react";
import "./EmptyChat.css";
export default function EmptyChat() {
	return (
		<div className="emptychat">
			<div className="emptychat-container">
				<img
					src="https://i.gadgets360cdn.com/large/whatsapp_multi_device_support_update_image_1636207150180.jpg"
					alt=""
				/>
				<p className="emptychat-title">WhatsApp Web</p>
				<p className="emptychat-subtitle">
					Now send and receive messages without keeping your phone
					online.
				</p>
				<p className="emptychat-subtitle">
					Use WhatsApp on up to 4 linked devices and 1 phone at the
					same time.{" "}
				</p>
			</div>
		</div>
	);
}
