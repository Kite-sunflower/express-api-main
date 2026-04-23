const mongoose = require('mongoose');
const connectDB = require('../../db/connection');

async function task() {
  try {
    await connectDB();
    const db = mongoose.connection;

    // task1
    const productName1 = 'Personal Computer';
    const addStock = 10;
    const supplierId = 'supplier 3';

    const productList = await db.collection('Products').find({ name: productName1 }).toArray();
    if (productList.length > 0) {
      await db.collection('Products').updateMany({ name: productName1 }, { $inc: { stock: addStock } });
      console.log('找到同名产品，库存 +10');
    } else {
      await db.collection('Products').insertOne({
        name: productName1,
        stock: addStock,
        description: 'A powerful desktop computer for personal use',
        tags: ['computer', 'desktop', 'personal'],
        suppliers: [
          {
            supplierId,
            price: 1000,
            date: new Date(),
          },
        ],
      });
      console.log('✅ 产品不存在，已新建');
    }

    //task2

    const productName2 = 'Computer';
    const sellQuantity = 10;

    const products = await db
      .collection('Products')
      .find({ name: productName2, stock: { $gte: sellQuantity } })
      .sort({ createTime: 1 })
      .toArray();

    const product = products[0];
    if (products.length === 0) {
      console.log(`${productName2}不存在`);
      return mongoose.disconnect();
    } else {
      await db.collection('Orders').insertOne({
        productId: product._id,
        quantity: sellQuantity,
        totalPrice: product.price * sellQuantity,
        username: 'lili',
        status: 'pending',
      });
      await db.collection('Products').updateOne({ _id: product._id }, { $inc: { stock: -sellQuantity } });
      console.log(` ${productName2} 成功出售 ${sellQuantity}`);

      mongoose.disconnect();
    }
  } catch (error) {
    console.error('failed', error);
    mongoose.disconnect();
  }
}
task();
