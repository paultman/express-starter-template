const express = require('express');
const path = require('path');
const morgan = require('morgan');
const config = require('./server.config');
const logger = require('./lib/logger');
const taskRoutes = require('./controllers/task');

const app = express();

app.use(
  morgan('tiny', {
    stream: {
      write: (message, encoding) => logger.info(message),
    },
  })
);

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.get('/task/all', taskRoutes.getAllTasks);
app.get('/task/:id', taskRoutes.getTask);

app.listen(config.app.port, () => {
  logger.info(`Server listening at http://localhost:${config.app.port}`);
});
