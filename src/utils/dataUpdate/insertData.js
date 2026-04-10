const mongoose = require('mongoose');
const connectDB = require('../../db/connection');

const Delivery = require('../../models/Delivery');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const Supplier = require('../../models/Supplier');

const insertAllData = async () => {
  await connectDB();
  try {
    const supplierData = [
      { name: 'supplier A', phone: '12893752790', address: 'moscow', createTime: new Date('2026-03-23') },
      { name: 'supplier B', phone: '13893752780', address: 'minsk', createTime: new Date('2026-04-23') },
      { name: 'supplier C', phone: '14893752770', address: 'vitebsk', createTime: new Date('2026-05-23') },
      { name: 'supplier A', phone: '12893752790', address: 'moscow', createTime: new Date('2026-06-26') },
      { name: 'supplier B', phone: '13893752780', address: 'minsk', createTime: new Date('2026-07-26') },
      { name: 'supplier C', phone: '14893752770', address: 'vitebsk', createTime: new Date('2026-08-26') },
      { name: 'supplier A', phone: '12893752790', address: 'moscow', createTime: new Date('2026-12-15') },
      { name: 'supplier B', phone: '13893752780', address: 'moscow', createTime: new Date('2027-01-15') },
      { name: 'supplier C', phone: '14893752770', address: 'moscow', createTime: new Date('2027-02-15') },
    ];
    const result1 = await Supplier.insertMany(supplierData);
    console.log('insert data successful');
    console.log(`insert ${result1.length}`);

    const productData = [
      { name: 'computer', price: 9999, stock: 123, description: 'computer', supplierId: result1[0]._id },
      { name: 'computer', price: 9999, stock: 123, description: 'computer', supplierId: result1[1]._id },
      { name: 'printer', price: 899, stock: 111, description: 'computer', supplierId: result1[2]._id },
      { name: 'printer', price: 799, stock: 112, description: 'printer', supplierId: result1[3]._id },
      { name: 'mouse', price: 699, stock: 200, description: 'printer', supplierId: result1[4]._id },
      { name: 'mouse', price: 97, stock: 800, description: 'mouse', supplierId: result1[5]._id },
    ];
    const result2 = await Product.insertMany(productData);
    console.log('insert data successful');
    console.log(`insert ${result2.length}`);

    const orderData = [
      { orderNo: 123456789, productId: result2[0]._id, quantity: 111, totalPrice: 8868, username: 'lili', status: 'pending' },
      { orderNo: 123456779, productId: result2[1]._id, quantity: 112, totalPrice: 8878, username: 'zhangsan', status: 'paid' },
      { orderNo: 123456769, productId: result2[2]._id, quantity: 113, totalPrice: 8888, username: 'lisi', status: 'shipped' },
      { orderNo: 123456759, productId: result2[3]._id, quantity: 114, totalPrice: 8898, username: 'wangwu', status: 'completed' },
      { orderNo: 123456749, productId: result2[4]._id, quantity: 1115, totalPrice: 8899, username: 'zhaoliu', status: 'pending' },
    ];
    const result3 = await Order.insertMany(orderData);
    console.log(`insert data successful`);
    console.log(`insert ${result3.length}`);

    const deliveryData = [
      { orderId: result3[0]._id, address: 'moscow street', status: 'waiting', deliveryTime: new Date('2025-02-03') },
      { orderId: result3[1]._id, address: 'london street', status: 'shipping', deliveryTime: new Date('2026-02-03') },
      { orderId: result3[2]._id, address: 'moscow street', status: 'delivered', deliveryTime: new Date('2026-03-03') },
      { orderId: result3[3]._id, address: 'vitebsk street', status: 'canceled', deliveryTime: new Date('2026-04-03') },
      { orderId: result3[4]._id, address: 'beijing street', status: 'waiting', deliveryTime: new Date('2026-05-03') },
    ];

    const result4 = await Delivery.insertMany(deliveryData);
    console.log(`data insert successful `);
    console.log(`insert ${result4.length}`);
  } catch (error) {
    console.error('insert fail', error);
  } finally {
    await mongoose.disconnect();
  }
};

insertAllData();
