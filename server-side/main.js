const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const uploadRouter = require('./routes/upload');

app.use(cors());

app.use('/', uploadRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
