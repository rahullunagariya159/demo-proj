const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
require('dotenv').config();
const path = require('path');
const ngrok = require('ngrok');

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

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/', userRoutes);

app.listen(process.env.PORT, () => {
	console.log('server started at 8000');
	(async function () {
		const endPointAccessibleOnTheInternet = await ngrok.connect(
			process.env.PORT
		);
		console.log(
			`Publically accessible tunnel to localhost : ${process.env.PORT} is available on ${endPointAccessibleOnTheInternet}`
		);
	})();
});
