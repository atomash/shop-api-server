const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    orders: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Order'
    }],
    comments:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
},{ 
    usePushEach: true 
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);