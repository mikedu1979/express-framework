const userservice = require("../service/tokenservice");
const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { use } = require("../router/routeruser");

function tokentest(req, res) {
  res.resultvalue("this is test for authentication", "send success");
}

function tokengenerator(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  userservice
    .getUserbyNamePwdAsync(username, password)
    .then(function (result) {
      if (result.length > 0) {
        let obj = {
          Id: result[0].Id,
        };
        let tokenStr = jwt.sign(obj, jwtConfig.secret, {expiresIn:jwtConfig.expiresIn});
        res.resultvalue(tokenStr, "token success");

      } else {
        res.resultvalue("", "user name or password wrong");
      }
    })
    .catch(function (err) {
      res.resultvalue([], err);
    });
}

module.exports = {
  tokentest,
  tokengenerator,
};
