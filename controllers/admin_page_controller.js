const path = require("path");

exports.create_get = (req, res) => {
    const username = req.session.username;
    res.render(path.resolve('./front/mainPage/create.ejs'), { username: username });
};