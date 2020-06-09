'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PORT= process.env.PORT||3000;
const app = express();

const error404 = require('./middleware/404.js');
const error500 = require('./middleware/500.js');
const Route = require('./auth/router.js');  
const extraRoute = require('./auth/extra-routes.js');



app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(express.static('./public'));


app.use(Route);  
app.use(extraRoute);


app.use(error404);
app.use(error500);

module.exports = {
  server: app,
  start: () => {
    app.listen(PORT, () => console.log(`Server is lestining on PORT ${PORT}`));
  },
};