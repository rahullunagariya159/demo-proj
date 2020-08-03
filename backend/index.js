const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
require('dotenv').config();

let userRoutes = require('./routes/user.route');

mongoose.connect(
	process.env.connectionString,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, result) => {
		if (err) {
			console.log('error while connecting to db', err);
		} else {
			console.log('successfully connected db');
		}
	}
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/', userRoutes);

app.listen(8000, () => {
	console.log('server started at 8000');
});
