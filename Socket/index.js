import { Server } from "socket.io";

const io = new Server(9000, {
	cors: {
		origin: "http://localhost:3000",
	},
});

let users = [];

const addUser = (userdata, socketid) => {
	!users.some((user) => user.sub == userdata.sub) &&
		users.push({ ...userdata, socketid });
};

const getUser = (userId) => {
	return users.find((user) => user.sub === userId);
};
const removeUser = (socketId) => {
	users = users.filter((user) => user.socketid !== socketId);
};

io.on("connection", (socket) => {
	console.log("User connected ");

	socket.on("adduser", (userdata) => {
		addUser(userdata, socket.id);
		io.emit("getuser", users);
	});

	socket.on("sendMessage", (data) => {
		const user = getUser(data.receiverid);
		if (user) {
			io.to(user.socketid).emit("getMessage", data);
		}
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
		removeUser(socket.id);
		io.emit("getuser", users);
	});
});
