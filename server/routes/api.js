const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongojs = require("mongojs"); // mongojs module

// mongodb://<dbuser>:<dbpassword>@ds235788.mlab.com:35788/meantodos
//var dbTodos = mongojs('mongodb://akash:9036@ds235788.mlab.com:35788/meantodos', ['todos']);
var dbTodos;
var collectionTodos;

// To connect to a local or service mongoDB.
const connection = (closure) => {
    // LOCAL:: mongodb://localhost:27017/ or SERVICE:: mongodb://akash:9036@ds235788.mlab.com:35788/meantodos
    return MongoClient.connect('mongodb://akash:9036@ds235788.mlab.com:35788/meantodos', (err, client) => {
        if (err) return console.log(err);
        dbTodos = client.db('meantodos');
        closure(dbTodos);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
    console.log(respose);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get todos
router.get('/todos', (req, res) => {
    connection((dbTodos) => {
        collectionTodos = dbTodos.collection('todos');
        collectionTodos
            .find()
            .toArray()
            .then((todos) => {
                console.log(todos);
                response.data = todos;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get todo by ID :: // 5a84179bf36d2873fcce99aa
router.get('/todo/:id', (req, res, next) => {
    connection((dbTodos) => {
        dbTodos.collection('todos')
            .findOne({ _id: mongojs.ObjectID(req.params.id)})
            .then((todo) => {
                response.data = todo;
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                sendError(err, res);
            });
    });
});

// Save todo
router.post('/saveTodo', (req, res) => {
    let todo = req.body;
    connection((dbTodos) => {
        dbTodos.collection('todos')
            .save(todo)
            .then((todo) => {
                response.data = todo;
                res.json(response);
            })
            .catch((err)=>{
                console.log(err);
                sendError(err, res);
            });
    });
});

// Update Todo.
router.put('/updateTodo/:id', (req, res, next) => {
    let todo = req.body;
    connection((dbTodos) => {
        dbTodos.collection('todos')
            .update({
                _id: mongojs.ObjectID(req.params.id)
            }, todo)
            .then((todo) => {
                response.data = todo;
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                sendError(err, res);
            });
    });
});

// Delete Todo.
router.delete('/deleteTodo/:id', (req, res, next) => {
    connection((dbTodos) => {
        dbTodos.collection('todos')
            .remove({
                _id: mongojs.ObjectID(req.params.id)
            })
            .then((todo) => {
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                sendError(err, res);
            });
    });
});


module.exports = router;