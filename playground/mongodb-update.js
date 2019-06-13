const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  const db = client.db('TodoApp')

  // search mongodb update operations

  // findOneAndUpdate(filter, update, options, cb)
  // db.collection('Todos')
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID('5d0200b11725557f75803fcd')
  //     },
  //     {
  //       $set: {
  //         completed: true
  //       }
  //     },
  //     {
  //       returnOriginal: false
  //     }
  //   )
  //   .then(res => {
  //     console.log(res)
  //   })

  db.collection('Users')
    .findOneAndUpdate(
      {
        _id: new ObjectID('5d01fbeb9b09a42797b5eb60')
      },
      {
        $set: { name: 'Eugene' },
        $inc: { age: 1 }
      },
      {
        returnOriginal: false
      }
    )
    .then(res => {
      console.log(res)
    })

  // client.close()
})
