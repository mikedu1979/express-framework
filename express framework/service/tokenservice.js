const { db } = require("../db/mysqldb.js");
var getUserbyNamePwdAsync = function (name, password) {
  return new Promise(function (resolve, reject) {
    let sql = "SELECT * FROM user where username=? and password=?";
    db.query(sql, [name, password], (err, result) => {
      if (err) {
        console.log(err.message);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
module.exports={
    getUserbyNamePwdAsync
}