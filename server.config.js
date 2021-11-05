const config = {
  app: {
    port: 3000,
  },
  db: {
    host: 'localhost',
    port: 27017,
    name: 'db',
  },
};
config.db.localMongoURI = `mongodb://${config.db.host}:${config.db.port}/?maxPoolSize=20&w=majority`;
module.exports = config;
