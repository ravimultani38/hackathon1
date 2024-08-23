const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensures that no two users can have the same email address
    },
    college: {
        type: String,
        enum: ['Queens College', 'Brooklyn College', 'Tech College'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    preference: {
        type: [String], // Array of strings to accommodate multiple preferences
        enum: ['SMS', 'Email'],
        default: [] // Default to an empty array if no preferences are selected
    }
});

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;
