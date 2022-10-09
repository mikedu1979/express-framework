const userservice = require("../service/userservice");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");
const { addUserImage } = require("../service/usermgdbservice");
function getUser(req, res) {
  userservice
    .getUserAsync()
    .then(function (result) {
      res.resultvalue(result, "request success");
    })
    .catch(function (err) {});
}

function getUserbyName(req, res) {
  userservice
    .getUserbyNameAsync(req.query.name)
    .then(function (result) {
      res.resultvalue(result, "request success");
    })
    .catch(function (err) {});
}

function addUser(req, res) {
  console.log("addUser");
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "../public/uploads"),
    keepExtensions: true,
  });

  form.parse(req, (err, fileds, files) => {
    if (err) {
      console.log("err", err);
      return;
    }
    if (files.hasOwnProperty("avatar")) {
      const { filepath, newFilename } = files.avatar;
      console.log(filepath);
      fs.readFile(filepath, "base64", function (err, data) {
        if (err) {
          return res.resultvalue({}, err, 1);
        }
        let exName = path.extname(filepath);
        console.log(exName);
        let mgdbimageId = uuid.v4();
        addUserImage({
          mgdbimageId: mgdbimageId,
          piccontent: data,
          pictype: exName,
        })
          let userBody={username:fileds.username,password:fileds.password,
            email:fileds.email,
            address:fileds.address,
            age:fileds.age,
            gnder:fileds.gender,
            imageId:mgdbimageId
          };
            userservice
              .addUserAsync(userBody)
              .then(function (result) {
                res.resultvalue(result, "request success");
              })
              .catch(function (err) {
                res.resultvalue([], err);
                console.log(err);
              });
          
      });
    } else {
      res.resultvalue({}, "please upload your avatar", 1);
    }
  });
}

function updateUser(req, res) {
  console.log("updateUser");
  userservice
    .updateUserAsync(req.body)
    .then(function (result) {
      res.resultvalue(result, "request success");
    })
    .catch(function (err) {
      res.resultvalue([], err);
      console.log(err);
    });
}

module.exports = {
  getUser,
  getUserbyName,
  addUser,
  updateUser,
};
