// app.js
const morgan = require('morgan');
const path = require('path');
const express = require('express');
const cookieSession = require('cookie-session');
const taskRoutes = require('./controllers/tasks');
const userRoutes = require('./controllers/users');

const app = express();
app.locals.projDir = __dirname;

app.use(
  cookieSession({
    name: 'session',
    maxAge: 1000 * 60 * 60 * 24 * 7, // miliseconds from now to expire, 1wk
    httpOnly: true, // unreadable via client JS
    sameSite: 'lax', // only sent from same website
    signed: true, // include signature to check tampering
    // secure: true, // must be over https
    keys: ['s3cr3t'],
  })
);

const checkAuth = (req, res, next) => {
  if (!(req.session && req.session.ref)) {
    if (req.headers['x-requested-with']) {
      // if request is an ajax request send json back
      res.status(302).send({ url: '/' });
    } else {
      res.redirect('/'); // do normal 302 redirect
    }
  } else next(); // they have an untampored with token, could further validatate here
};

app.init = (config, logger, db) => {
  taskRoutes.init(config, logger, db);
  userRoutes.init(config, logger, db);
  app.use(
    morgan('tiny', {
      stream: {
        write: (message) => logger.info(message),
      },
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/task/all', taskRoutes.getAll);
  app.get('/task/:id', taskRoutes.get);
  app.post('/task', taskRoutes.create);
  app.post('/task/:id', taskRoutes.update);
  app.delete('/task/:id', taskRoutes.delete);
  app.post('/enter', userRoutes.enter);
  app.get('/tasks.html', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/tasks.html'));
  });
  app.get('/', (req, res) => {
    if (req.session && req.session.user) res.sendFile(path.join(__dirname, '/dist/tasks.html'));
    else res.sendFile(path.join(__dirname, '/dist/index.html'));
  });
  app.get('/logout', userRoutes.logout);
  app.use(express.static('dist'));
};

module.exports = app;
