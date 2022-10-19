const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', () => {
//    console.log('Connected to DB')
})

db.on('error', () => {
    console.log('DB Error:', error);
});

module.exports = db;