const express = require('express')
const path = require("path")
const adminController = require(path.resolve("./controllers/admin_controller"))
const router = express.Router();
router
    .route('/')
    .get(adminController.login_get)
    .post(adminController.login_post)
module.exports = router