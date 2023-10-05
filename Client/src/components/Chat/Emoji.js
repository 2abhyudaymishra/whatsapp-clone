import React, { useRef } from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { InsertEmoticon } from "@mui/icons-material";
import "./Emoji.css"
import { IconButton } from "@mui/material";
export default function Emoji({usermessage,emojislider}) {
    const toggleEmojiSlider = (e) => {
        const list = emojislider.current.classList;
        if(list.contains("hidden")){
            emojislider.current.classList.remove("hidden");
        }
        else{
            emojislider.current.classList.add("hidden");
        }
        
   };
   const addemoji =(e)=>{
       const value = usermessage.current.value;
       usermessage.current.value=value+e.native;
       usermessage.current?.focus();
   }
	return (
		<div className="emojibutton">
            <IconButton  onClick={toggleEmojiSlider}>
			    <InsertEmoticon  />
            </IconButton>
			<div className="chat-emoji-slider hidden" ref={emojislider}>
				<Picker data={data} onEmojiSelect={addemoji} theme="light" />
			</div>
		</div>
	);
}
