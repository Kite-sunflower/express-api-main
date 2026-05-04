const bcrypt = require('bcryptjs');

const pwd = '1111';

const hash = bcrypt.hash(pwd, 10).then((hash) => {
  console.log('加密后的密码');
  console.log(hash);
});
