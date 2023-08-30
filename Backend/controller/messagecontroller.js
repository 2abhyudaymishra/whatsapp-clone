const Message = require("../model/Message");
const Conversation= require("../model/Conversation");
const newmesssage=async(req,res)=>{
    try {
        const newmessage = await Message.create(req.body);
        await Conversation.findByIdAndUpdate(req.body.conversationid , {message : req.body.message}) 
        res.status(200).send(newmessage);

    } catch (error) {
		return res.status(500).send({msg:error});

    }
}
const getmesssage=async(req,res)=>{
    try {
        const messages = await Message.find({conversationid:req.params.id})
        return res.status(200).send(messages);

    } catch (error) {
		return res.status(500).send({msg:error});

    }
}

module.exports={
    newmesssage,getmesssage
}