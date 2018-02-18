const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: 'User'
    },
    cart: {type: Object, required: true},
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Order', schema);