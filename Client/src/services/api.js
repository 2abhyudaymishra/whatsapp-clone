import axios from "axios";
const url = "http://localhost:8000/";

export const adduser = async (data) => {
	try {
		await axios.post(url + "adduser", data);
	} catch (error) {
		console.log(error);
	}
};
export const getusers = async () => {
	try {
		let response = await axios.get(url + "getuser");
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const setConversation = async (data) => {
	try {
		let response = await axios.post(url + "conversation/add", data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const newmessage = async (data) => {
	try {
		const response = await axios.post(url + "message/add", data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const getmessage = async (id) => {
	try {
		let response = await axios.get(url + "message/get/" +id);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const broadcastAmessage = async (data) => {
	try {
		let response = await axios.post(url + "message/broadcast",data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
export const uploadFile = async(data)=>{
	try {
		let response = await axios.post(url + "file/upload",data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}