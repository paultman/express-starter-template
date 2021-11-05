// app.js
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const taskRoutes = require('./controllers/task');

const app = express();

app.init = (config, logger, db) => {
  taskRoutes.init(config, logger, db);
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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/task/all', taskRoutes.getAll);
  app.get('/task/:id', taskRoutes.get);
  app.post('/task', taskRoutes.create);
  app.post('/task/:id', taskRoutes.update);
  app.delete('/task/:id', taskRoutes.delete);
};

module.exports = app;
