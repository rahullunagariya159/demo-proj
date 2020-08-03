const mongoose = require('mongoose');

let newUserSchema = mongoose.Schema(
	{
		email: { type: String },
		password: { type: String },
	},
	{
		collection: 'users',
	}
);

module.exports = new mongoose.model('users', newUserSchema);
