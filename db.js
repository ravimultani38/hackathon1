const mongoose = require('mongoose');


const mongoURL = 'mongodb+srv://jascharansingh2:Mannus1234@cluster0.97loz.mongodb.net/';

mongoose.connect(mongoURL, {

});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (err) => { 
    console.log('MongoDB server error', err);
});

db.on('disconnected', () => {
    console.log('MongoDB server disconnected');
});

module.exports = db;