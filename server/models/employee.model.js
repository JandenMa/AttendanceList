const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    id: { type: String, required: true, max: 20 },
    firstName: { type: String, required: true, max: 64 },
    lastName: { type: String, required: true, max: 64 },
    email: { tyle: String, required: false }
})

module.exports = mongoose.model('Employee',EmployeeSchema);