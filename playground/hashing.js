const { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')

var data = {
  id: 10
}

// sign(data, secretString)
var token = jwt.sign(data, '123abc')
console.log(token)

var decoded = jwt.verify(token, '123abc')
console.log(decoded)

// ==================================
// Using crypto-js
// ==================================
// var message = 'I am user number 3'
// var hash = SHA256(message).toString()
// // hash should be a string
// // SHA256() returns and object. add toString()

// // console.log(`Message: ${message}`)
// // console.log(`Hash: ${hash}`)

// var data = {
//   id: 4
// }

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // change data, result will be 'Data was changed'
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if (resultHash === token.hash) {
//   console.log('Data was not changed')
// } else {
//   console.log('Data was changed! Do not trust!')
// }
// ==================================
// Using crypto-js
// ==================================
