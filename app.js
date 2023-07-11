require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const regionRouter = require('./routes/region');
const whatsappBotRouter = require('./routes/whatsappbot');
const complaintRouter = require('./routes/complaint');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/region', regionRouter);
app.use('/whatsappbot', whatsappBotRouter);
app.use('/complaint', complaintRouter);

module.exports = app;
