const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    text: {type: String, required: true},
    autor:{type: String, required: true},
    date: { type: Date, default: Date.now }
});


export default mongoose.model('Comment', schema);