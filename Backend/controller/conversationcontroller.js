const Conversation = require("../model/Conversation");
const newconversation =async (req, res) => {
	try {
		const {senderid,receiverid}= req.body;
        
        const exist = await Conversation.findOne({members: { $all: [receiverid,senderid]} })
        if(exist){
            return res.status(200).send({details:exist});
        }
        const newConversation = await Conversation.create({
            members:[senderid,receiverid]
        })
        return res.status(200).send({details:newConversation});

	} catch (error) {
		return res.status(500).send({msg:error});
		
	}
};
const broadcastconversations = async (req, res) => {
	try {
		const { receivers, sender } = req.body;
		let conversationIds = []
		for (user of receivers) {
			const Conversationdetails = await Conversation.findOne({
				members: { $all: [user, sender] },
			});

			const id = Conversationdetails._id.toString();
			conversationIds.push(id);
		}
		res.status(200).send({ success: true,conversationIds });
	} catch (error) {
		return res.status(500).send({ msg: error });
	}
};

module.exports = {
    newconversation,
    broadcastconversations
};
