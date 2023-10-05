const url = "http://localhost:8000";

const uploadfile = async (req, res) => {
	try {
		if (!req.file) {
			res.status(404).send({ success: false });
		}
		const filedetails= {
			url : `${url}/file/${req.file.filename}`,
			mime : req.file.mimetype,
			size : req.file.size,
			name:req.file.originalname,
		}

		res.status(200).send({ success: true, filedetails });
	} catch (error) {
		return res.status(500).send({ msg: error });
	}
};

const grid = require("gridfs-stream");
const mongoose = require("mongoose");
let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
	gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
		bucketName: "fs",
	});
	gfs = grid(conn.db, mongoose.mongo);
	gfs.collection("fs");
});

const getfile = async (req, res) => {
	try {
		const file = await gfs.files.findOne({
			filename: req.params.filename,
		});
		const readStream = gridfsBucket.openDownloadStream(file._id);
		readStream.pipe(res);
	} catch (error) {
		return res.status(500).send({ msg: error });
	}
};
module.exports = {
	uploadfile,
	getfile,
};
