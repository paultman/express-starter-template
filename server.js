// server.js
const { MongoClient } = require('mongodb');
const config = require('./server.config');
const logger = require('./lib/logger');
const app = require('./app');

const mongoClient = new MongoClient(config.db.localMongoURI);

(async function start() {
  await mongoClient.connect();
  await app.init(config, logger, mongoClient.db('ESTv1'));
  app.listen(config.app.port, () => {
    logger.info(`Server listening at http://localhost:${config.app.port}`);
  });
})();
