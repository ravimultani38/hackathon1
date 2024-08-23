const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: () => {
            // Create a date in UTC and convert it to EST
            const now = new Date();
            const estOffset = -4; // EST is UTC-4
            now.setHours(now.getHours() + estOffset);
            return now;
        },
        required: true
    },
    categories: {
        type: String,
        enum: ['food', 'library', 'gym', 'alerts'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
