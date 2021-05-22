const express = require('express');

// PORT NUMBER
const port = 8000;

// Create object of express
const app = express();

// GET THE PATH OBJECT TO SET THE PATH OF CSS FILE\
const path = require('path');

// For Decoding URL
app.use(express.urlencoded());

// Set View Engine
app.set('view engine', 'ejs');

// Use CSS and JS File
app.use(express.static('assets'));

//Create Database
const db = require('./config/mongoose');

// Import the TODO from models
const Todo = require('./models/todo');

// set the path of views directory
app.set('views',path.join(__dirname, 'views'));

// HOME page URL
app.get('/', function(req,res){
    Todo.find({}, function(err, todos){
        if(err){
            console.log('error',err);
            return;
        }
        return res.render('home',
            {
                title: "TODO APP",
                monthNames: [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ],
                todo_list: todos
            }
        );
        
    });
    
});

// This is the url for creating task in the database
app.post('/create-todo', function(req,res){
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function(err){
        if(err){
            console.log('error in creating task', err);
            return;
        }
        return res.redirect('back');
    });
});

// This is delete url for single task from database
app.get('/delete_todo_single', function(req,res){
    let id = req.query.id;
    Todo.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error");
            return;
        }
        return res.redirect('back');
    });
});

// This is the url to delete the multiple tasks from database
app.post('/delete-todo', function(req,res){
    let ids = req.body.task;
    // if single task is to be deleted
    if(typeof(ids) == "string"){
        Todo.findByIdAndDelete(ids, function(err){
            if(err){
                console.log("error in deleting");
                return;
            }
        });
    } else { // if multiple tasks to be deleted
        for (let i = 0; i < ids.length; i++){
            Todo.findByIdAndDelete(ids[i], function(err){
                if(err){
                    console.log('error in deleting');
                    return;
                }
            });
        }
    }
    return res.redirect('back');
});



// Server
app.listen(port, function(err){
    if(err){
        console.log("Error in setting up the server");
    }

    console.log(`Express server is up and running on port: ${port}`);
})