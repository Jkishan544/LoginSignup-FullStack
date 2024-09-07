const mongoose = require('mongoose');    // Mongoose is an Object Data Modeling (ODM) , Mongoose makes it easier to interact with MongoDB in a structured way,
//giving you tools for schema validation, middleware, and data querying.
const mongo_url = "mongodb+srv://jkishan544:1234@cluster0.crd7b.mongodb.net/ShopGadgets?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(mongo_url).then(() => {
    console.log('mongoDB connected...');

}).catch((err) => {
    console.log('mongoDB connection error:', err);

})