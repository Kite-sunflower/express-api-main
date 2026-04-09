const connectDB = require('../../db/connection');


const Product = require('../../models/Product');
const Supplier = require('../../models/Supplier');
const Order = require('../../models/Order');
const Delivery = require('../../models/Delivery');


//通用查询函数
async function getAllData(model,name){
    const data = await model.find();
    console.log(`\n===${name} collection data`);
    console.log(JSON.stringify(data,null,2));
    return data;
};


//主函数
async function init() {
    try {
        await connectDB();
        console.log('DB connect successful');

        await getAllData(Product,"product");
        await getAllData(Order,"order");
        await getAllData(Supplier,"supplier");
        await getAllData(Delivery,"delivery");

        console.log("\n All collection quiry complete")
        process.exit(0);
    } catch (err) {
        console.error("\n ❌execution failed",err);
        process.exit(1);
    }
};
init();