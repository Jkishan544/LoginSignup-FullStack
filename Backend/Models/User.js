const mongoose = require('mongoose');
const Schema = mongoose.Schema;     //defines the structure of documents in a MongoDB collection. It acts like a blueprint, specifying the types, default values, validation, and more for each field in a document.


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;