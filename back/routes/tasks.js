const router = require('express').Router();// import Router from express

let tasks = require('../models/tasks.model'); // import mongoose model

// route => handles imcoming http get requests
router.route('/').get((req, res) => {
    tasks.find() // get list of all the users from mongodb database 
        .then(user => res.json(user)) // in json
        .catch(err => res.status(400).json('1Error: ' + err)); // if error return 400 with err message
});

// route => if url /users/add run this post(if post only)
router.route('/addtask').post((req, res) => {

    const name = 'adefaultq task name :(' // req.body.name; // from the input - the rest are the default values for the new empty task
    const subtasks = [];
    const archived = false;
    const projectName = 'faw';//req.body.projectName;


    const newTask = new tasks({
        name,
        subtasks,
        archived,
        projectName
    }); // create the tasks with the given values

    newTask.save() // save to databse
        .then(() => res.json('New task added!'))
        .catch(err => res.status(400).json('Erwwwrorц: ' + err)); // if error return 400 with err message
});


// to delete task with id
router.route('/:id').delete((req, res) => {
    tasks.findByIdAndDelete(req.params.id)// will find the exact task in the db and delete it
        .then(() => res.json('Task successfully deleted.'))
        .catch(err => res.status(400).json('2Error: ' + err));
});



module.exports = router; // export router