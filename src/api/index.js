import express from 'express';
import csrf from 'csurf';

import productsController from './controllers/products';
import cartController from './controllers/cart';
import userController from './controllers/user';

const router = express.Router();
const csrfProtection = csrf();
router.use(csrfProtection);

//Products
router.get('/get-products', productsController.getProducts);
router.get('/product/:id', productsController.getOneProduct);
router.get('/category-product/:id', productsController.getProductsByCategory);

//Cart
router.get('/add-to-cart/:id', cartController.addToCart);
router.get('/get-cart', cartController.getItemsCart);
router.get('/remove/:id', cartController.remove);
router.get('/reduce/:id', cartController.removeOne);

//User
router.get('/get-csrf-token', notLoggedIn, userController.getCsrfToken);
router.post('/signin', notLoggedIn, userController.signIn);
router.post('/signup', notLoggedIn, userController.signUp);
router.get('/profile', isLoggedIn, userController.getProfile);
router.get('/logout', isLoggedIn, userController.logout);
router.post('/add-order', isLoggedIn, userController.addOrder);
router.post('/add-comment', isLoggedIn, userController.addComment);


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({login: req.isAuthenticated()});
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.json({login: req.isAuthenticated()});
}

export default router;