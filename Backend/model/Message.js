const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
	{
		message: {type: String,},
		receiverid: { type: String },
		senderid: { type: String },
		type: { type: String },
		conversationid: { type: String },
		filemime: { type: String },
        filesize : {type:String},
        filename:{type:String},
        fileurl : {type:String},
		reply : {type : String}
	},
	{
		timestamps: true,
	}
);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
