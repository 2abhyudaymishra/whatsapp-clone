const Message = require("../model/Message");
const Conversation = require("../model/Conversation");
const newmesssage = async (req, res) => {
	try {
		const newmessage = await Message.create(req.body);
		await Conversation.findByIdAndUpdate(req.body.conversationid, {
			message: req.body.message,
		});
		res.status(200).send(newmessage);
	} catch (error) {
		return res.status(500).send({ msg: error });
	}
};
const getmesssage = async (req, res) => {
	try {
		const messages = await Message.find({ conversationid: req.params.id });
		return res.status(200).send(messages);
	} catch (error) {
		return res.status(500).send({ msg: error });
	}
};
const broadcastmesssage = async (req, res) => {
	try {
		const { receivers, message, sender } = req.body;
		for (user of receivers) {
			const Conversationdetails = await Conversation.findOne({
				members: { $all: [user, sender] },
			});
			const conversationid = Conversationdetails._id.toString();
			if (Conversationdetails) {
				const messagedetails = {
					message,
					receiverid: user,
					senderid: sender,
					type: "text",
					conversationid,
				};
				await Message.create(messagedetails);
				await Conversation.findByIdAndUpdate(conversationid, {
					message: message,
				});
			}
		}
		res.status(200).send({ success: true });
	} catch (error) {
		return res.status(500).send({ msg: error });
	}
};

module.exports = {
	newmesssage,
	getmesssage,
	broadcastmesssage,
};
