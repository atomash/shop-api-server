import Product from '../models/product';
import Cart from '../models/cart';

exports.addToCart = (req, res) => {
    const productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.status(404).send("Not found");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.status(200).json({
            productsInCart: cart.generateArray(),
            totalPrice: cart.totalPrice,
            totalQty: cart.totalQty
        });
    });
};

exports.getItemsCart = (req, res) => {
    if (!req.session.cart) {
        return res.status(200).json({productsInCart: [], totalQty: 0, totalPrice: 0});
    }
    let cart = new Cart(req.session.cart);
    res.status(200).json({
        productsInCart: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty
    });
};

exports.remove = (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.remove(productId);
    req.session.cart = cart;
    res.status(200).json({
        productsInCart: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty
    });
};

exports.removeOne = (req, res) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeOne(productId);
    req.session.cart = cart;
    res.status(200).json({
        productsInCart: cart.generateArray(),
        totalPrice: cart.totalPrice,
        totalQty: cart.totalQty
    });
};