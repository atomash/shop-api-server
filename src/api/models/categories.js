const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {type: String, required: true},
    img: { type: String },
    products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }]
    
},{ 
    usePushEach: true 
});


export default mongoose.model('Categories', schema);