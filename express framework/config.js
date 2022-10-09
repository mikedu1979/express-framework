module.exports = {
  jwtConfig: {
    secret: "shhhhhhared-secret",
    audience: "apitester",
    issuer: "issuer",
    algorithms: ["HS256"],
    expiresIn:'2h'
  },
  mysqlConfig: {
    host: "127.0.0.1",
    user: "root",
    password: "1234567",
    database: "dbtest",
  },
  mongodbConfig: {
    host: "127.0.0.1",
    dbName: "TestMongoDB",
    user: "useradmin",
    pass: "adminpassword",
  },
};
