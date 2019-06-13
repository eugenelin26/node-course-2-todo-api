const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  const db = client.db('TodoApp')

  // db.collection('Todos')
  //   .find({
  //     // completed: false
  //     _id: new ObjectID('5d01e4f44c0c5c211016f9b4')
  //   }) // specify what to find
  //   .toArray() // return an array of results
  //   .then(
  //     docs => {
  //       console.log('Todos')
  //       console.log(JSON.stringify(docs, undefined, 2))
  //       // console.table(docs)
  //     },
  //     err => {
  //       console.log('Unable to fetch todos', err)
  //     }
  //   )

  // db.collection('Todos')
  //   .find() // specify what to find
  //   .count() // return an array of results
  //   .then(
  //     count => {
  //       console.log(`Todos count: ${count}`)
  //     },
  //     err => {
  //       console.log('Unable to fetch todos', err)
  //     }
  //   )

  // find documents with name: 'Eugene
  db.collection('Users')
    .find({
      name: 'Eugene'
    }) // specify what to find
    .toArray() // return an array of results
    .then(
      docs => {
        console.log(JSON.stringify(docs, undefined, 2))
      },
      err => {
        console.log('Unable to fetch todos', err)
      }
    )

  // client.close()
})
