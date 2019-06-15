// to create test database environment
// "test": "export NODE_ENV=test || SET NODE_ENV && mocha server/**/*.test.js"
var env = process.env.NODE_ENV || 'development'
// console.log('env ******', env)

if (env === 'development' || env === 'test') {
  var config = require('./config.json')
  var envConfig = config[env]

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key]
  })
}

// if (env === 'development') {
//   process.env.PORT = 3000
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
// } else if (env === 'test') {
//   process.env.PORT = 3000
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
// }

// configure heroku, sample commands
// heroku config // check
// heroku config:set NAME=Eugene // add name (or any variable) eugene to heroku config
// heroku config:get NAME // get name, in this case, Eugene
// heroku config:unset NAME // remove name

// need to set JWT_ENV
