// Local Module
const { storeRouter } = require('./Routes/storeRouter');
const { adminRouter } = require('./Routes/adminRouter');
const errorController = require('./Controller/errorController');
const { authRouter } = require('./Routes/authRouter');

// External Module
const express = require("express");
const { default: mongoose } = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const DB_PATH = "mongodb+srv://kkp1882006_db_user:MongoDBPass123@airnb.qsqzoam.mongodb.net/airnb?appName=airnb";


const app = express();

app.set("view engine", 'ejs');
app.set('views', ['views', 'views/store', 'views/admin', 'views/auth']);

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const store = new MongoDBStore({
    uri: DB_PATH,
    collection: 'sessions'
})

app.use(session({
    secret: 'my-secret', // secret for encrypting the session ID
    resave: false, // do not save session if it is not modified
    saveUninitialized: true, // save session if it is not initialized
    store: store
}));


app.use("/auth", authRouter);
app.use("/admin", (req, res, next) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect("/auth/login");
    }
})
app.use(storeRouter);
app.use("/admin", adminRouter);

app.use("/", errorController.pageNotFound);


mongoose.connect(DB_PATH)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log(`Server running on http://localhost:3000`);
            // print first record in console
        });
    })
    .catch((error) => {
        console.log(error);
    });


