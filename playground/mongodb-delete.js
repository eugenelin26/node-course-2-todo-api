const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  const db = client.db('TodoApp')

  // deleteMany
  // db.collection('Todos')
  //   .deleteMany({ text: 'Eat lunch' })
  //   .then(result => {
  //     console.log(result)
  //   })

  // deleteOne (delete one document)
  // db.collection('Todos')
  //   .deleteOne({ text: 'Eat lunch' })
  //   .then(result => {
  //     console.log(result)
  //   })

  // findOneAndDelete (delete one document and returns the deleted document)
  // db.collection('Todos')
  //   .findOneAndDelete({ completed: false })
  //   .then(res => {
  //     console.log(res)
  //   })

  // db.collection('Users').deleteMany({ name: 'Eugene' })

  db.collection('Users')
    .findOneAndDelete({ _id: new ObjectID('5d01fc2345971827ba79df4f') })
    .then(res => {
      console.log(JSON.stringify(res, undefined, 2))
    })

  // client.close()
})
