const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    imagePath: {type: String, required: true},
    title: {type: String, required: true},
    slug: {type: String},
    categories: {type: String},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    comments:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
},{ 
    usePushEach: true 
});

export default mongoose.model('Product', schema);