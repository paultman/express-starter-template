const { MongoClient } = require('mongodb');
const config = require('../server.config');

// setup new collection with starter task data
MongoClient.connect(config.db.localMongoURI, (err, client) => {
  if (err) {
    console.log(`have error: ${err}`);
    return;
  }
  const db = client.db('ESTv1');
  const starterCol = db.collection('tasks');
  const starterTasks = [
    { _id: 1, descr: 'call Nick for upcoming birthday', state: 'open' },
    { _id: 2, descr: 'check travel requirements for Chile', state: 'open' },
    { _id: 3, descr: 'finish TPS report', state: 'done' },
  ];
  starterCol.insertMany(starterTasks, (err, doc) => {
    if (err) {
      console.log(err);
      throw err;
    } else console.log('Record inserted to db: ', doc);
  });
});
