// To start database, type commands
// sudo service mongod start
// sudo service mongod status

// ===========================================
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
//============================================

require('./config/config.js')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

var { mongoose } = require('./db/mongoose')

// models
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var { authenticate } = require('./middleware/authenticate')

// create new instance
// save with promise

var app = express()
const port = process.env.PORT || 3000

// middleware
app.use(bodyParser.json())

// ================================================
// routes
// Todos
// create
app.post('/todos', authenticate, (req, res) => {
  // console.log(req.body)
  var todo = new Todo({
    // what you type in postman
    text: req.body.text,
    _creator: req.user._id
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
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos })
    },
    e => {
      res.status(400).send(e)
    }
  )
})

// find by id // :id variable from url
app.get('/todos/:id', authenticate, (req, res) => {
  // res.send(req.params)
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(e => res.status(400).send(e))
})

// find by id and remove
app.delete('/todos/:id', authenticate, (req, res) => {
  // res.send(req.params)
  var id = req.params.id

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(e => res.status(400).send(e))
})

// update
app.patch('/todos/:id', authenticate, (req, res) => {
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

  // Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
  Todo.findOneAndUpdate(
    { _id: id, _creator: req.user._id },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }

      res.send({ todo })
    })
    .catch(e => res.status(400).send())
})
// ================================================

// Users
// create user
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)

  // model methods (eg User) and instance methods (eg user)
  // User.findByToken //
  // user.generateAuthToken // individual document

  user
    .save()
    .then(() => {
      // user here is not the same as user above
      return user.generateAuthToken()
    })
    .then(token => {
      // header has 2 arguments
      // 'x-' custom header
      res.header('x-auth', token).send(user)
    })
    .catch(e => res.status(400).send(e))
})

// get user
app.get('/users/me', authenticate, (req, res) => {
  // var token = req.header('x-auth')

  // User.findByToken(token)
  //   .then(user => {
  //     if (!user) {
  //       return Promise.reject()
  //     }

  //     res.send(user)
  //   })
  //   .catch(e => res.status(401).send())

  // from middleware
  res.send(req.user)
})

// login using email and password
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password)
    .then(user => {
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user)
      })
    })
    .catch(e => res.status(400).send())
})

// logout user
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send()
    },
    () => {
      res.status(400).send()
    }
  )
})

// ===============================================
// listening port
app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {
  app
}
