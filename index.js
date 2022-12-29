
const path = require('path');
const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(PORT, () => {
  console.log(` TODO server is up and running. Listening on port ${PORT}.`);
});

