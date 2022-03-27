const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
})

const Model = mongoose.model('customers', schema)

/*const register = new Model({
    name: 'Nailton',
    age: 25,
    email: 'nltsilva8@gmail.com',
    password: '123456'
})

register.save()*/

module.exports = Model