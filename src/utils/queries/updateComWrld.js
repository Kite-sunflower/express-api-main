const mongoose = require('mongoose');
const connectDB = require('../../db/connection');

async function task1() {
  await connectDB();
  const db = mongoose.connection;

  const productName = 'Personal Computer';
  const addStock = 10;
  const supplierId = 'supplier 3';

  const existingProduct = await db.collection('Products').findOne({ name: productName });

  if (existingProduct) {
    await db.collection('Products').updateOne({ name: productName }, { $inc: { stock: addStock } });
    console.log('找到同名产品，库存 +10');
  } else {
    await db.collection('Products').insertOne({
      name: productName,
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

  mongoose.disconnect();
}

task1().catch((err) => {
  console.error('错误：', err);
  mongoose.disconnect();
});
