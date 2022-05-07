const express = require('express')
const path = require("path")
const adminPageController = require(path.resolve("./controllers/admin_page_controller"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();

router
    .route('/')
    .get(isAuth, adminPageController.create_get)
module.exports = router