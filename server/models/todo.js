var mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
  // search for other kinds of validators
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true // removes whitespace
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

module.exports = {
  Todo
}
