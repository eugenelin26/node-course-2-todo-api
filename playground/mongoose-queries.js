const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

var id = '5d0234c2a64c854f3152f01e'
var userid = '5d0218f9764cf438bac022f6'

// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }

// Todo.find({
//   _id: id // possible since it can convert string to object id
// }).then(todos => {
//   console.log('Todos', todos)
// }) // returns an array

// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('Todo', todo)
// }) // returns an object

// Todo.findById(id)
//   .then(todo => {
//     if (!todo) {
//       return console.log('ID not found')
//     }
//     console.log('Todo by id', todo)
//   })
//   .catch(e => console.log(e))

// user.findbyid
User.findById(userid).then(
  user => {
    if (!user) {
      return console.log('Unable to find user')
    }
    console.log(user)
  },
  e => console.log(e)
)
