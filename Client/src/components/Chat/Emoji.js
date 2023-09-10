import React from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { InsertEmoticon } from "@mui/icons-material";
import "./Emoji.css"
export default function Emoji({usermessage}) {
    const toggleEmojiSlider = (e) => {
        e.target.nextSibling?.classList.toggle("hidden");
   };
   const addemoji =(e)=>{
       const value = usermessage.current.value;
       usermessage.current.value=value+e.native;
       usermessage.current?.focus();
   }
	return (
		<div className="emojibutton">
			<InsertEmoticon onClick={toggleEmojiSlider} />
			<div className="chat-emoji-slider hidden">
				<Picker data={data} onEmojiSelect={addemoji} theme="light" />
			</div>
		</div>
	);
}
