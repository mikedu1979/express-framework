const express = require("express");
const { jwtConfig } = require("./config");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");
const log4js = require("./common/log4Builder")
const logger = log4js.getLogger("info")

// const mongdbimage = require("./service/usermgdbservice");

const uuid = require("uuid");
const app = express();

const cors = require("cors");
app.use(cors());

const commonresult = require("./middleware/returnvalue");
app.use(commonresult.commonresult);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
logger.info("current date", new Date().toLocaleString())
//const expressjwt = require("express-jwt");
var { expressjwt: jwt } = require("express-jwt");
app.use(
  jwt({
    secret: jwtConfig.secret,
    // audience: jwtConfig.audience,
    algorithms: jwtConfig.algorithms,
    // issuer: jwtConfig.issuer,
    // getToken: function fromHeaderOrQuerystring(req) {
    //   if (
    //     req.headers.authorization &&
    //     req.headers.authorization.split(" ")[0] === "Bearer"
    //   ) {
    //     let token = req.headers.authorization.split(" ")[1];
    //     console.log(token);
    //     return req.headers.authorization.split(" ")[1];
    //   } else if (req.query && req.query.token) {
    //     return req.query.token;
    //   }
    //   return null;
    // },
  }).unless({ path: [/^\/token/] })
);
const mgdb = require("./db/mongodb");
app.get("/token/test", function (req, res) {
  let mgdbimageId = uuid.v4();
  console.log(mgdbimageId);
  // mongdbimage.addUserImage({
  //   mgdbimageId: "9f31ed17-0bb1-4bb9-8e38-4bc3a1476d58",
  //   piccontent:
  //     "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDA",
  //   pictype: "jpg",
  // });

  res.send("--------------------");
});

app.post("/token/updateImage", (req, res) => {
  const form = formidable({
    multiples: true,
    uploadDir: path.join(__dirname, "./public/uploads"),
    keepExtensions: true,
  });

  form.parse(req, (err, fileds, files) => {
    if (err) {
      console.log("err", err);
      return;
    }

    console.log("fileds", fileds);

    //console.log("files", files);

    if (files.hasOwnProperty("avatar")) {
      const { filepath, newFilename } = files.avatar;
      console.log(filepath);
      fs.readFile(filepath, "base64", function (err, data) {
        if (err) {
          return console.log(err);
        }

        console.log(data);
        res.send(data);
      });
    }
  });
});

const routeruser = require("./router/routeruser");
app.use("/user", routeruser);

const routertoken = require("./router/routertoken");
app.use("/token", routertoken);

const erorhandle = require("./middleware/errorhandling");
app.use(erorhandle.errorhandling);

app.listen(9000, () => {
  console.log("connection succssful");
});
