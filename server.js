const express = require('express');
const config = require('./config');

const app = express();

app.use(express.static('client'));

app.listen(config.app.port, () => {
  console.log(`Server listening at http://localhost:${config.app.port}`);
});
