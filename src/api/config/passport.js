import passport from 'passport';
import User from '../models/user';

const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, email, password, done) {
    let errors = req.validationErrors();
    if (req.validationErrors()) {
        return done(null, false, {message: errors});
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {message: 'Email is already in use.'});
        }
        let newUser = new User();
        newUser.email = email;
        newUser.username = req.body.username;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Empty email').notEmpty();
    req.checkBody('password', 'Empty password').notEmpty();
    let errors = req.validationErrors();
    if (req.validationErrors()) {
        return done(null, false, {message: errors});
    }
    User.findOne({'email': email}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'No user found.'});
        }
        if (!user.validPassword(password)) {
               return done(null, false, {message: 'Wrong password.'});
        }
        return done(null, user);
    });
}));