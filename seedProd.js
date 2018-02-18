var Product = require('./dist/api/models/product');
var Categories = require('./dist/api/models/categories');


var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/testshop', {
    useMongoClient: true,
});

mongoose.Promise = global.Promise;

var products = [
    {
        imagePath: 'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
        title: 'iphone X',
        categories: 'Mobile phones',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque perspiciatis deleniti quam est unde ad non quidem iste blanditiis, maxime fugit, tempore dolorem voluptatem commodi, dignissimos sequi praesentium architecto accusantium!',
        price: 1300
    },
    {
        imagePath: 'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
        title: 'iphone 8',
        categories: 'Mobile phones',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam numquam inventore, dolor nemo asperiores officia omnis ea commodi, eveniet nostrum vel. Beatae fugiat saepe dolores ipsum odit deleniti, culpa porro!',
        price: 1300
    },
    {
        imagePath: 'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
        title: 'Macbook 12',
        categories: 'Laptops',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veritatis numquam voluptate deleniti mollitia. Aut ullam esse quaerat vitae neque dignissimos, ipsa facilis eum dolores? Earum mollitia impedit inventore eligendi.',
        price: 1000
    },
    {
        imagePath: 'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
        title: 'MacbookPro 13',
        categories: 'Laptops',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque laborum doloremque, mollitia excepturi voluptas commodi, distinctio laudantium nulla quisquam tenetur sed cum natus. Quae, quidem illo? Dolores cum necessitatibus omnis.',
        price: 1500
    },
    {
        imagePath: 'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
        title: 'MacbookPro 15',
        categories: 'Laptops',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ea, a temporibus, cumque ducimus veritatis excepturi deleniti aperiam aliquid aliquam tempora exercitationem numquam debitis et repudiandae officiis saepe odit doloremque?',
        price: 2000
    },
    {
        imagePath: 'http://www.gesgi.com/wp-content/uploads/2014/05/demo-image-325x390.png',
        title: 'ipad',
        categories: 'Tablets',
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit ea, a temporibus, cumque ducimus veritatis excepturi deleniti aperiam aliquid aliquam tempora exercitationem numquam debitis et repudiandae officiis saepe odit doloremque?',
        price: 500
    }
];


var done = 0;
async function seed (prod) {
        const newProd = new Product(prod);
        let category = await Categories.find({
                    name: prod.categories
                });
        await newProd.save();
        if (!category.length) {
            category = [
                new Categories({name: newProd.categories})
            ];
        
        }
        category[0].products.push(newProd);
        await category[0].save();

        done++;
        if (done === products.length) {
            exit();
        }
    }

for (var i = 0; i < products.length; i++) {
    seed(products[i]);   
}

function exit() {
    mongoose.disconnect();
}





// const newProduct = new Product(products[i]);
    // newProduct.save(() => {
    //     Categories
    //         .find({
    //             name: newProduct.categories
    //         }, function (category) {
    //             let newCategory = category;
    //             if (!category.length) {
    //                 newCategory = [new Categories({name: newProduct.categories})];

    //             }
    //             newCategory[0]
    //                 .products
    //                 .push(newProduct);
    //             newCategory[0].save()
    //         });
    // });