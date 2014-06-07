var mongoose = require('mongoose');
var idvalidator = require('mongoose-id-validator');
var Schema = mongoose.Schema;
var wineSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	winery: { 
		type: Schema.Types.ObjectId, 
		ref: 'Winery', 
		required: true 
	}
});
wineSchema.plugin(idvalidator);
var Wine = mongoose.model('Wine', wineSchema);
module.exports = Wine;
