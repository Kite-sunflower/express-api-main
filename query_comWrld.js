const connectDB = require('./src/db/connection');
const mongoose = require('mongoose');


async function run(){
    await connectDB();
    const db = mongoose.connection;


    //1.Get a list of products purchased in January 2021.
    const result1 = await db.collection('Sales').aggregate([
        {$match:{"date":{$gte: new Date("2021-01-01"),$lte: new Date("2021-01-31")}}},
        {$unwind:"$productsSold"},
        { $lookup: {
            from: "Products",
            localField: "productsSold.productId",
            foreignField: "_id",
            as: "product"
        }},
        { $unwind: "$product" },
        { $replaceRoot: { newRoot: "$product" } },
        {$group:{_id:"$name",name:{$first:"$name"}}},
        {$project:{name:1,_id:0}}
    ]).toArray();

    console.log('products purchased in January 2021');
    console.log(result1);


    //2.Obtain the names of the vendors that supplied the printers or computers during the 2021.
    const result2 = await db.collection('Sales').aggregate([
    { $match: { date: {$gte: new Date("2021-01-01"),$lte: new Date("2021-12-31") } }},
    { $unwind: "$productsSold" },
    { $lookup: { from: "Products", localField: "productsSold.productId", foreignField: "_id", as: "product" } },
    { $unwind: "$product" },
    { $match: { "product.name": { $in: ["Personal Computer", "Printer"] } } },
    { $unwind:"$product.suppliers"},
    { $lookup: { from: "Suppliers", localField: "product.suppliers.supplierId", foreignField: "_id", as: "supplier" } },
    { $unwind: "$supplier" },
    { $group: { _id: "$supplier._id", name: { $first: "$supplier.name" } } },
    { $project: { supplierName: "$name", _id: 0 } }
  ]).toArray();
  console.log("\n=== 2. 2021年供应电脑/打印机的供应商 ===");
  console.log(result2);


  //3.Get a list of cities from which goods were delivered
  const result3 = await db.collection('Suppliers').aggregate([
    { $group: { _id: "$address.city" } },
    { $project: { city: "$_id", _id: 0 } }
  ]).toArray();
  console.log("\n=== 3. 发货城市 ===");
  console.log(result3);


  //4.Obtain information about who supplied goods for a total amount of more than 70,000 rubles.
  const result4 = await db.collection('Products').aggregate([
    {$unwind:"$suppliers"},
    { $group: { _id: "$suppliers.supplierId", total: { $sum: "$suppliers.price" } } },
    { $match: { total: { $gt: 100 } } },
    { $lookup: { from: "Suppliers", localField: "_id", foreignField: "_id", as: "supplier" } },
    { $unwind: "$supplier" },
    { $project:{supplierName:"$supplier.name",city:"$supplier.address.city",totalSupplyAmount:"$total",_id:0}}
  ]).toArray();
  console.log("\n=== 4. 供货超过70000的供应商 ===");
  console.log(result4);


  //5.For each type of product, determine the supplier that supplies it at the highest price.
  const result5 = await db.collection('Products').aggregate([
    { $unwind: "$suppliers" },
    { $group:{_id:"$name",maxPrice:{$max:"$suppliers.price"},supplierId:{$first:"$suppliers.supplierId"}}},
    { $lookup: { from: "Suppliers", localField: "supplierId", foreignField: "_id", as: "supplier" } },
    { $unwind: "$supplier" },
    { $project: {
      productName: "$_id",
      supplierName: "$supplier.name",
      maxPrice: "$maxPrice",
      _id: 0
    }}
  ]).toArray();
  console.log("\n=== 5. 每类产品最高价供应商 ===");
  console.log(result5);


  //6.Get statistics on the number of orders made in 2021
  const result6 = await db.collection('Sales').aggregate([
    { $match: { date: {$gte: new Date("2021-01-01"),$lte: new Date("2021-12-31")} } },
    { $count : "totalOrders"}
  ]).toArray();
  console.log("\n=== 6. 2021年订单数量 ===");
  console.log(result6);
    mongoose.disconnect();
};

run().catch(err=>{
    console.error('error',err);
    mongoose.disconnect();
}
);