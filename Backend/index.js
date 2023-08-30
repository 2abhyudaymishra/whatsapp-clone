const port = process.env.PORT || 8000;
require("dotenv").config();
const dburi = process.env.DB;

const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
mongoose.connect(dburi);

app.use("/", require("./routes/routes"));

app.listen(port, () => {
	console.log(`http://localhost:8000`);
});
