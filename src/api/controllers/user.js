import passport from 'passport';
import Order from '../models/orders';
import User from '../models/user';
import Commnet from '../models/comments';
import Product from '../models/product';
import Cart from '../models/cart';

exports.getCsrfToken = (req, res) => {
    res.json({
        csrfToken: req.csrfToken(), 
        login: req.isAuthenticated()
    })
};

exports.logout = (req, res) => {
    req.logout();
    res.json({
        login: req.isAuthenticated(),
        csrfToken: req.csrfToken()
    });
};

exports.signIn = (req, res, next ) => {
    passport.authenticate('local.signin', function(error, user, info) {
        if(error) {
            return res.status(500).json(error);
        }
        if(!user) {
            return res.status(401).json({status: "error", message: info.message});
        }
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({login: req.isAuthenticated() });
        });
    })(req, res, next);
};


exports.signUp = (req, res, next) => {
    passport.authenticate('local.signup', function(error, user, info) {
        if(error) {
            return res.status(500).json(error);
        }
        if(!user) {
            return res.status(401).json({message: info.message});
        }
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr);
            }
            return res.json({ login: req.isAuthenticated() });
        });
    })(req, res, next);
};


exports.getProfile = async (req, res) => {
    const o = await User
    .findById(req.user.id)
    .populate('orders')
    .populate('comments');
    res.json({
        name: req.user.username,
        email: req.user.email,
        orders: o.orders,
        comments: o.comments, 
        login: req.isAuthenticated()
    });
};

exports.addComment = async (req, res) => {
    const user = req.user;
    const commentObj = {
        autor: user.username,
        text: req.body.text
    }
    const prodId = req.body.productId;
    try {
        const newCommnet = new Commnet(commentObj);
        await newCommnet.save();
        const product = await Product.findById(prodId);
        product.comments.push(newCommnet);
        await product.save();
        user.comments.push(newCommnet);
        await user.save();
        res.json({
            comment: commentObj,
        });
    } catch(error){
        res.json({
            message: error,
        });
    }
};

exports.addOrder = async (req, res) => {
    const user = req.user;
    const cart = new Cart(req.session.cart);
    const orderObj = {
        user: user.id,
        cart: cart.generateArray()
    }
    try {
        const newOrder = new Order(orderObj);
        await newOrder.save();
        user.orders.push(newOrder);
        await user.save();
        req.session.cart = {
            productsInCart: [], 
            totalQty: 0, 
            totalPrice: 0
        };
        res.json({
            message: 'Success',
            cart: req.session.cart,  
            login: req.isAuthenticated()
        });
    } catch(error) {
        res.json({
            message: error,  
            login: req.isAuthenticated()
        });
    }
        
};

