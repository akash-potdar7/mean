const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
// const mongojs = require("mongojs"); // mongojs module
// const db = mongojs("mean", ["user"]); // mongojs module

var db;
var collectionUser;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
        if (err) return console.log(err);
        db = client.db('mean');
        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        collectionUser = db.collection('user');
        collectionUser
            .find()
            .toArray()
            .then((users) => {
                console.log(users);
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get users // mongojs module
/* router.get("/users", (req, res, next) => {
 db.users.find((err, users) => {
  if (err) return next(err);
  response.data = users;
  res.json(response);
 });
}); */

module.exports = router;