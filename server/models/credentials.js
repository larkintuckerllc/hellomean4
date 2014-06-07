var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var credentialSchema = new Schema({
	token: {
		type: String,
		required: true
	}
});
var Credential = mongoose.model('Credential', credentialSchema);
module.exports = Credential;
