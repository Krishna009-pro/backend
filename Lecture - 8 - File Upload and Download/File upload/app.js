// Core Module
const path = require('path');

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
const multer = require("multer");

const DB_PATH = "mongodb+srv://kkp1882006_db_user:MongoDBPass123@airnb.qsqzoam.mongodb.net/airnb?appName=airnb";


const app = express();

app.set("view engine", 'ejs');
app.set('views', ['views', 'views/store', 'views/admin', 'views/auth']);

const randomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, randomString(10) + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const multerOptions = { // multer options for file upload at /uploads
    storage, fileFilter                                 // dest: "uploads/"
}

const rootDir = path.dirname(require.main.filename);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer(multerOptions).single("image"));
app.use('/uploads', express.static(path.join(rootDir, 'uploads')));
app.use('/admin/uploads', express.static(path.join(rootDir, 'uploads')));

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


