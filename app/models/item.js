var mongoose = require('mongoose');
//setup object model
//need field for item name and item quantity
//if no qty entered assume 1 is needed
//if no cost don't try to guess... they will survive
module.exports = mongoose.model('Item', {
    text: {
        type: String,
        default: ''
    },
	qty: {
		type: Number,
		default: 1
	},
	cost: {
		type: Number,
		default: 0
	}
});