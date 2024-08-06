const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development'])

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.get("/", (req, res) => {

  res.send("My API is up and running Yo!");
});

app.listen(port, () => console.log('server is up and running'));