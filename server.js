const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(config.app.port, () => {
  console.log(`Server listening at http://localhost:${config.app.port}`);
});
