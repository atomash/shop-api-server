import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import validator from 'express-validator';
import cors from 'cors';

import api from './api';

const MongoStore = require('connect-mongo')(session);
const app = express();

mongoose.connect('mongodb://localhost:27017/testshop', {
    useMongoClient: true,
});
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
    console.log("Connected to database");
});
mongoose.connection.on('error', (err) => {
    console.log('Connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('database disconnected');
});

import './api/config/passport';

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(logger('[:date[clf]] ":method :url HTTP/:http-version" :status  :response-time ms'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ 
        mongooseConnection: mongoose.connection 
    }),
    cookie: {
        httpOnly: true, maxAge: 180 * 60 * 1000 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

app.use('/api', api);
app.get('*', function (req, res) {
    const index = path.join(__dirname, 'public', 'index.html');
    res.sendFile(index);
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message: err.message});
});

export default app;
