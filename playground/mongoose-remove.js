const { ObjectID } = require('mongodb')

const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

// remove() will not work. remove({})
Todo.remove({}).then(res => {
  console.log(res)
})

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({ _id: '5d0253031725557f75805926' }).then(todo => {
  console.log(todo)
})

Todo.findByIdAndRemove('5d0253031725557f75805926').then(todo => {
  console.log(todo)
})
