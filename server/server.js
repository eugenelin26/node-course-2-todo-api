// To deploy app to heroku, go to package.json
// add start script
// add engine and node version

// === commands ===
// heroku create
// heroku addons:create mongolab:sandbox
// heroku config
// git commit -am 'message'
// git push
// git push heroku master

// heroku logs
// can see errors

// from heroku config
// you will see MONGODB_URI which can be
// accessed from process.env

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

var { mongoose } = require('./db/mongoose')

// models
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

// create new instance
// save with promise

var app = express()
const port = process.env.PORT || 3000

// middleware
app.use(bodyParser.json())

// routes
// create
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

// find all
app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos })
    },
    e => {
      res.status(400).send(e)
    }
  )
})

// find by id // :id variable from url
app.get('/todos/:id', (req, res) => {
  // res.send(req.params)
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(e => res.status(400).send(e))
})

// find by id and remove
app.delete('/todos/:id', (req, res) => {
  // res.send(req.params)
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findByIdAndRemove(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(e => res.status(400).send(e))
})

// update
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(e => res.status(400).send())
})

// listening port
app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {
  app
}
