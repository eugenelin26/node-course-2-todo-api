var mongoose = require('mongoose')

// from  the command 'heroku config'
// you will see MONGODB_URI which can be
// accessed from process.env

mongoose.Promise = global.Promise
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')
mongoose.connect(process.env.MONGODB_URI)

module.exports = {
  mongoose
}
