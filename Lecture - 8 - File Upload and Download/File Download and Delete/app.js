// Core Module
const path = require('path');
const fs = require('fs');

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

// directories
const rootDir = path.dirname(require.main.filename);
const imageDir = path.join(rootDir, "Data/homeImages");
const pdfDir = path.join(rootDir, "Data/homeRules");

[imageDir, pdfDir].forEach(dir => { // create directories if they don't exist
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

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
        if (file.fieldname === "image") {
            cb(null, imageDir);
        } else if (file.fieldname === "rulesFile") {
            cb(null, pdfDir);
        }
    },
    filename: (req, file, cb) => {
        cb(null, randomString(10) + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (
        file.fieldname === "image" &&
        (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    ) {
        return cb(null, true);
    }

    if (
        file.fieldname === "rulesFile" &&
        [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ].includes(file.mimetype)
    ) {
        return cb(null, true);
    }

    cb(new Error("Invalid file type"), false);
};


const multerOptions = { // multer options for file upload 
    storage,
    fileFilter
}

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multer(multerOptions).fields([
    { name: "image", maxCount: 1 },
    { name: "rulesFile", maxCount: 1 }
]));

// Static file serving - FIXED with leading slashes
app.use("/Data/homeImages", express.static(imageDir));
app.use("/Data/homeRules", express.static(pdfDir));
app.use("/admin/Data/homeImages", express.static(imageDir));
app.use("/admin/Data/homeRules", express.static(pdfDir));

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
app.use("/", (req, res, next) => {
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


