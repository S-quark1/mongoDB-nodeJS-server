const express = require('express')
const path = require("path");
const adminController = require(path.resolve("./controllers/admin_controller"))
const router = express.Router();

router
    .route('/')
    .get(adminController.register_get)
    .post(adminController.register_post)
module.exports = router