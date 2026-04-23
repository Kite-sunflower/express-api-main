const app = require('./app');
const connectDB = require('../src/db/connection'); // 引入数据库连接

// 先连数据库 → 成功后再启动服务
const startServer = async () => {
  try {
    // 1. 先等数据库连接成功（这就是你缺的！）
    await connectDB();

    // 2. 数据库连上了，再开服务
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Listening on port ${port}\n${process.env.MONGO_URI}`);
    });
  } catch (error) {
    console.log('服务启动失败', error);
  }
};

startServer();
