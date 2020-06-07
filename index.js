'use strict';
const dotenv = require('dotenv');
dotenv.config();
const server = require('./src/server.js');
const mongoose = require('mongoose');

const MONGOOSE_URI=process.env.MONGOOSE_URI || 'mongodb://localhost:27017/serverVir';

mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useCreateIndex:true,useUnifiedTopology:true });

server.start();