const express = require("express")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser")
const connectDB = require("./config/db");
const config = require("./config/db.config");
const mongoURI = config.url;
const app = express();

connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
) //stores the session

app.use('/admin', require("./routes/admin"))
// app.use('/login',require("./routes/admin_login"))
// app.use('/register',require("./routes/admin_reg"))
// app.use('/admin_page', require("./routes/admin_page"))
// app.use('/logout', require("./routes/admin_logout"))

app.listen(8080,() =>
    console.log(`App listening at http://localhost:8080/admin/login`)
)