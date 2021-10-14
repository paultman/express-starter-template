const morgan = require('morgan');
const path = require('path');
const express = require('express');
const taskRoutes = require('./controllers/task');

module.exports = (config, logger) => {
  const app = express();
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.info(message),
      },
    })
  );
  app.use(express.static('dist'));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
  });

  app.get('/task/all', taskRoutes.getAllTasks);
  app.get('/task/:id', taskRoutes.getTask);

  return app;
};
