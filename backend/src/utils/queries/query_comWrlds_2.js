const mongoose = require('mongoose');
const connectDB = require('../../db/connection');

async function run() {
  await connectDB();
  const db = mongoose.connection;

  // 1.1. Obtain the names and phone numbers of the vendors that supplied the printers during the summer of 2006..
  const result1 = await db
    .collection('Sales')
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date('2006-06-01'),
            $lt: new Date('2006-09-01'),
          },
        },
      },
      { $unwind: '$ProductsSold' },
      {
        $lookup: {
          from: 'Products',
          localField: 'ProductsSold.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      {
        $match: {
          'product.name': 'Printer',
        },
      },
      { $unwind: '$product.suppliers' },
      {
        $lookup: {
          from: 'Suppliers',
          localField: 'product.suppliers.supplierId',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: '$supplier' },
      {
        $group: {
          _id: '$supplier._id',
          supplierName: { $first: '$supplier.name' },
          phone: { $first: '$supplier.phone' },
        },
      },
      {
        $project: {
          _id: 0,
          supplierName: 1,
          phone: 1,
        },
      },
    ])
    .toArray();

  console.log('获取 2006 年夏季打印机供应商的名称和电话号码');
  console.log(result1);

  // 2. Obtain information about the number of suppliers located in each city.
  const result2 = await db
    .collection('Suppliers')
    .aggregate([
      {
        $group: {
          _id: '$address.city',
          supplierCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          city: '$_id',
          supplierCount: 1,
        },
      },
    ])
    .toArray();

  console.log('获取各城市供应商的数量信息');
  console.log(result2);

  // 3. Determine the total cost of goods in stock.
  const result3 = await db
    .collection('Products')
    .aggregate([
      { $unwind: '$suppliers' },
      {
        $group: {
          _id: '$_id',
          stock: { $first: '$stock' },
          minPrice: { $min: '$suppliers.price' },
        },
      },
      {
        $group: {
          _id: null,
          totalCost: {
            $sum: { $multiply: ['$minPrice', '$stock'] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalStockCost: '$totalCost',
        },
      },
    ])
    .toArray();

  console.log('3. 计算库存商品的总成本');
  console.log(result3);

  // 4. Determine the suppliers (display full name and city) who supplied goods for a total amount of more than 70,000 rubles.
  const result4 = await db
    .collection('Products')
    .aggregate([
      { $unwind: '$suppliers' },
      {
        $group: {
          _id: '$suppliers.supplierId',
          total: { $sum: '$suppliers.price' },
        },
      },
      { $match: { total: { $gt: 70000 } } },
      {
        $lookup: {
          from: 'Suppliers',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: '$supplier' },
      {
        $project: {
          supplierName: '$supplier.name',
          city: '$supplier.address.city',
          totalSupplyAmount: '$total',
          _id: 0,
        },
      },
    ])
    .toArray();
  console.log('\n=== 4.确定总金额超过 70,000 卢布的供应商（显示全名和所在城市）===');
  console.log(result4);

  // 5. For each type of product, determine the supplier that supplies it at the lowest price.
  const result5 = await db
    .collection('Products')
    .aggregate([
      { $unwind: '$suppliers' },
      {
        $group: {
          _id: '$name',
          minPrice: { $min: '$suppliers.price' },
          supplierId: { $first: '$suppliers.supplierId' },
        },
      },
      {
        $lookup: {
          from: 'Suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplierInfo',
        },
      },
      { $unwind: '$supplierInfo' },
      {
        $project: {
          _id: 0,
          productName: '$_id',
          lowerprice: '$minPrice',
          supplierName: '$supplierInfo.name',
        },
      },
    ])
    .toArray();

  console.log('5. 针对每种产品，确定价格最低的供应商。');
  console.log(result5);

  // 6. For each supplier, determine the total number of goods sold in December 2006.
  const result6 = await db
    .collection('Sales')
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date('2006-12-01'),
            $lte: new Date('2006-12-31'),
          },
        },
      },
      { $unwind: '$productsSold' },
      {
        $lookup: {
          from: 'Products',
          localField: 'productsSold.productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      { $unwind: '$product' },
      { $unwind: '$product.suppliers' },
      {
        $group: {
          _id: '$product.suppliers.supplierId',
          totalSold: { $sum: '$productsSold.quantity' },
        },
      },
      {
        $lookup: {
          from: 'Suppliers',
          localField: '_id',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: '$supplier' },
      {
        $project: {
          _id: 0,
          supplierName: '$supplier.name',
          totalSaleQuantity: '$totalSold',
        },
      },
    ])
    .toArray();

  console.log('6. 确定每个供应商在 2006 年 12 月的商品销售总量。');
  console.log(result6);

  // 7. Obtain information about the supplier (name, phone number) who delivered the goods in January 2007 at the highest price.
  const result7 = await db
    .collection('Products')
    .aggregate([
      { $unwind: '$suppliers' },
      {
        $match: {
          'suppliers.date': {
            $gte: new Date('2020-01-01'),
            $lte: new Date('2020-01-31'),
          },
        },
      },
      {
        $group: {
          _id: '$name',
          maxPrice: { $max: '$suppliers.price' },
          productData: { $first: '$$ROOT' },
        },
      },
      {
        $project: {
          productName: '$_id',
          maxPrice: 1,
          supplierId: '$productData.suppliers.supplierId',
        },
      },
      {
        $lookup: {
          from: 'Suppliers',
          localField: 'supplierId',
          foreignField: '_id',
          as: 'supplier',
        },
      },
      { $unwind: '$supplier' },
      {
        $project: {
          _id: 0,
          productName: 1,
          highestDeliveryPrice: '$maxPrice',
          supplierName: '$supplier.name',
          supplierPhone: '$supplier.phoneNumber',
        },
      },
    ])
    .toArray();

  console.log('7. 获取 2007 年 1 月以最高价格交付货物的供应商信息（名称、电话号码）。');
  console.log(result7);

  // 8. Get statistics on the number of orders in March, April, May 2006 in the form
  const result8 = await db
    .collection('Sales')
    .aggregate([
      {
        $match: {
          date: {
            $gte: new Date('2006-03-01'),
            $lte: new Date('2006-05-31'),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$date' },
          orderCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          orderQuantity: '$orderCount',
        },
      },
      { $sort: { month: 1 } },
    ])
    .toArray();

  console.log('8. 获取2006年3月、4月和5月的订单数量统计数据。');
  console.log(result8);

  mongoose.disconnect();
}

run().catch((err) => {
  console.error('error', err);
  mongoose.disconnect();
});
