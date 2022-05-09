const express = require("express")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser")
const connectDB = require("./config/db");
const config = require("./config/db.config");
const path = require("path");
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
app.use('/admin', require("./routes/admin-main-page"))
app.get('/trident', (req, res) => res.render(path.resolve('./front/trident.ejs')))
// app.use('/logout', require("./routes/admin_logout"))

app.listen(8080,() =>
    console.log(`App listening at http://localhost:8080/trident`)
)