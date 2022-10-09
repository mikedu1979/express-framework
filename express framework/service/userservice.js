const { db } = require("../db/mysqldb.js");

var getUserAsync = function () {
  return new Promise(function(resolve,reject){
    let sql ="SELECT * FROM user";
  db.query(sql,(err, result) => {
    if (err) {
      console.log(err.message);
      reject(err);
      return
   }
   resolve(result);
  });
});
}

var getUserbyNameAsync = function (name) {
  return new Promise(function(resolve,reject){
    let sql = "SELECT * FROM user where username=?";
    db.query(sql, name, (err, result) => {
      if (err) {
         console.log(err.message);
         reject(err);
         return
      }
      resolve(result);
    });
  });
  
};

var addUserAsync = function (body) {
  return new Promise(function(resolve,reject){
    let sql = "insert into user(username,password,email,address,age,gender,imageId) values (?,?,?,?,?,?,?)";
    db.query(sql,[body.username,body.password,
      body.email,body.address,body.age,body.gender,body.imageId],
       (err, result) => {
        console.log('insert');
      if (err) {
         console.log(err.message);
         reject(err);
         return
      }
      resolve(result);
    });
  });
};

var updateUserAsync = function (body) {
  return new Promise(function(resolve,reject){
    let sql = "update user set ? where id=?";
    db.query(sql,[body,body.Id],
       (err, result) => {
        console.log('update');
      if (err) {
         console.log(err.message);
         reject(err);
         return
      }
      resolve(result);
    });
  });
};

module.exports = {
  getUserAsync,
  getUserbyNameAsync,
  addUserAsync,
  updateUserAsync
};
