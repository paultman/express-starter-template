const config = require('./server.config');
const logger = require('./lib/logger');

const app = require('./app')(config, logger);

app.listen(config.app.port, () => {
  logger.info(`Server listening at http://localhost:${config.app.port}`);
});
