const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const url = "mongodb://127.0.0.1:27017/whatsapp";

const storage = new GridFsStorage({
	url,
	options: { useNewUrlParser: true },
	file: (request, file) => {
		//returning the file name
		return `${Date.now()}-blog-${file.originalname}`;
	},
});

module.exports = multer({ storage });
