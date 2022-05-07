const bcrypt = require("bcryptjs")
const Admin = require("../models/admin");
const path = require("path");

exports.login_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./front/login.ejs'), { err: error });
};

exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });

    if (!user) {
        req.session.error = "Invalid email";
        return res.redirect('/admin/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        req.session.error = "Invalid password";
        return res.redirect('/admin/login');
    }

    req.session.isAuth = true;
    req.session.username = user.username;
    res.redirect('/');
};

exports.register_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render(path.resolve('./front/register.ejs'), { err: error });
};

exports.register_post = async (req, res) => {
    const { username, email, password } = req.body;

    let user = await Admin.findOne({ email });

    if (user) {
        req.session.error = "Admin already exists";
        return res.redirect('/admin/register');
    }

    const hashPsw = await bcrypt.hash(password, 11);

    user = new Admin({
        username,
        email,
        password: hashPsw,
    });

    await user.save();
    res.redirect('/');
};

// exports.main_get = (req, res) => {
//     const username = req.session.username;
//     res.render(path.resolve('./front/mainPage/create.ejs'), { name: username });
// };

exports.logout_post = (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/admin/login');
    });
};