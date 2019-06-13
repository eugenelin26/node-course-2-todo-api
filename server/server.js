var express = require('express')
var bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')

// models
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

// create new instance
// save with promise

var app = express()

// middleware
app.use(bodyParser.json())

// routes
// Using postman
app.post('/todos', (req, res) => {
  // console.log(req.body)
  var todo = new Todo({
    // what you type in postman
    text: req.body.text
  })

  todo.save().then(
    doc => {
      res.send(doc)
    },
    e => {
      res.status(400).send(e)
    }
  )
})

// listening port
app.listen(3000, () => {
  console.log('Started on port 3000')
})
