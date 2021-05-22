const mongoose = require('mongoose');

// Schema for Todo list object (Task)
const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: [ { 
            type: String, 
            enum: ["Personal", "Work", "School","Cleaning","Other"] 
        } ],
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// creating mongoose model
const Todo = mongoose.model('todo',todoSchema);

// exporting the model 'todo'
module.exports = Todo;