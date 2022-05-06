const express = require('express')
const path = require("path");
const adminController = require(path.resolve("./controllers/admin_controller"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

router
    .route('/')
    .get(isAuth, adminController.dashboard_get)
module.exports = router