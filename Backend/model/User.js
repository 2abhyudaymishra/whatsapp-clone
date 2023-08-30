const mongoose = require("mongoose");

const Userschema = mongoose.Schema({
	iss: {
		type: String,
	},
	azp: {
		type: String,
	},
	aud: {
		type: String,
	},
	sub: {
		type: String,
		required : true
	},
	hd: {
		type: String,
	},
	email: {
		type: String,
	},
	email_verified: {
		type: Boolean,
	},
	nbf: {
		type: Number,
	},
	name: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required : true
	},
	given_name: {
		type: String,
	},
	family_name: {
		type: String,
	},
	locale: {
		type: String,
	},
	iat: {
		type: Number,
	},
	exp: {
		type: Number,
	},
	jti: {
		type: String,
	},
});
const User = mongoose.model("User", Userschema);
module.exports = User;
