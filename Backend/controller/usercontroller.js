const User  = require("../model/User");
const adduser =async (req, res) => {
	try {
		let exist = await User.findOne({sub:req.body.sub});
		if(exist){
			return res.status(200).send({msg: "User Already Exist"});

		}
		const newuser = await User.create(req.body);
		if(newuser){
			return res.status(200).send(newuser);
		}
	} catch (error) {
		return res.status(500).send({msg:error});
		
	}
};
const getusers =async (req, res) => {
	try {
		const users = await User.find({});
		return res.status(200).send(users);
	} catch (error) {
		return res.status(500).send({msg:error});
		
	}
};

module.exports = {
	adduser,
	getusers
};
