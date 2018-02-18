import Product from '../models/product';
import Categories from '../models/categories';

exports.getProducts = async (req, res) => {
    let prods = await Product.find();
    res.status(200).json({ 
        products:prods
    });
};

exports.getProductsByCategory = async(req, res) => {
    try {
        const category = await Categories.findById(req.params.id).populate('products');
            res.status(200).json({prod: category.products});
        } catch (error) {
            res.json({ prod:false });
        }
}

exports.getOneProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ prod:product });
    } catch (error) {
        res.json({ prod:false });
    }
};

// exports.newProduct = async (req, res) => {
//     const newProd = new Product(req.body);
//     const category = await Categories.findById(categoryId);
//     newProd.category = category;
//     await newProd.save();
//     category.products.push(newProd);
//     await category.save();
//     res.status(201).json({ newProd });
// };
