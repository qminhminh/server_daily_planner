const authController = require("../controller/authController");

const routerAuth = require("express").Router();


routerAuth.post('/register', authController.createUser);

routerAuth.post('/login', authController.loginUser);


module.exports = routerAuth;