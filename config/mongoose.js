// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/todo_list_db');

// acquire the connection (to check if it is succesful)
const db = mongoose.connection;

// error
db.on('error', console.error.bind(console, "Error connecting to the database."));

// up and running
db.once('open', function(){
    console.log("Successfully connected to the database.");
});