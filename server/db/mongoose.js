var mongoose = require('mongoose')

// heroku config

// you will see MONGODB_URI which can be
// accessed from process.env

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')

module.exports = {
  mongoose
}
