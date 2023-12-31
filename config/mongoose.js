const mongoose = require('mongoose');
const env = require('./environment');

//connecting library
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

//acquiring the connection (to check its sucessful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error in connecting to db'));

//up and running the print message
db.once('open',function(){
    console.log('successfully connected to db');
});

module.exports = db ;