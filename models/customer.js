const mongoose = require ('mongoose')

const customerSchema = new mongoose.Schema({ // this is the schema created
    name: String,
    age: Number
});

// this is how you turn it into a model
const Customer = mongoose.model('Customer', customerSchema)

// then export it to use it into other files 
module.exports = Customer 