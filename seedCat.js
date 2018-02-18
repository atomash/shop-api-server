var Categories = require('./dist/api/models/categories');


var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/testshop', {
    useMongoClient: true,
});

mongoose.Promise = global.Promise;

var categories = [ 
    new Categories({
        title: 'Mobile phones',
        img: 'https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/list-image/phones/nova-plus/nova-plus-listimage-black.png'
    }),
    new Categories({
        title: 'Laptops',
        img: 'https://www.pcexpress.lu/wp-content/uploads/2016/12/macbook.png'
    }),
    new Categories({
        title: 'Tablets',
        img: 'http://pngimg.com/uploads/tablet/tablet_PNG8600.png'
    }),
    new Categories({
        title: 'Accessories',
        img: 'http://www.silver-lining.com/res/c2ag_400x285_3_Accessories2.png'
    }),
];

var done = 0;
for (var i = 0; i < categories.length; i++) {
    categories[i].save(function() {
        done++;
        if (done === categories.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}