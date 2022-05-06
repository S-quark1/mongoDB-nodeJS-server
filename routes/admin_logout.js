const express = require('express')
const path = require("path");
const adminController = require(path.resolve("./controllers/admin_controller"))
const router = express.Router();

router
    .route('/')
    .post(adminController.logout_post)
module.exports = router