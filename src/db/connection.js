const mongoose = require('mongoose');
const dotenv = require('dotenv'); // 用来读取配置环境文件

const env = process.env.NODE_ENV || 'development';

dotenv.config({
  path: env === 'production' ? '.env.prod' : '.env.dev',
});

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connection successful:${conn.connection.host} (${env})`);
  } catch (error) {
    console.log('DB connect failed', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
