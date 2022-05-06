const express = require('express')
const path = require("path")
const adminController = require(path.resolve("./controllers/admin_controller"))
const isAuth = require(path.resolve("./auth/auth"))
const router = express.Router();
router
    .route('/login')
    .get(adminController.login_get)
    .post(adminController.login_post)
router
    .route('/logout')
    .post(adminController.logout_post)
router
    .route('/register')
    .get(adminController.register_get)
    .post(adminController.register_post)
router
    .route('/admin-page')
    .get(isAuth, adminController.dashboard_get)
module.exports = router