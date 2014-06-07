var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var winerySchema = new Schema({
	name: {
		type: String,
		required: true
	}
});
var Winery = mongoose.model('Winery', winerySchema);
module.exports = Winery;
