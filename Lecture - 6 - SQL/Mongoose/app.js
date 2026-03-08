const { storeRouter } = require('./Routes/storeRouter');
const { adminRouter } = require('./Routes/adminRouter');
const errorController = require('./Controller/errorController');
const express = require("express");
const { default: mongoose } = require('mongoose');
const app = express();

app.set("view engine", 'ejs');
app.set('views', ['views', 'views/store', 'views/admin']);

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(storeRouter);
app.use("/admin", adminRouter);


app.use("/", errorController.pageNotFound);

const DB_PATH = "mongodb+srv://kkp1882006_db_user:MongoDBPass123@airnb.qsqzoam.mongodb.net/airnb?appName=airnb";

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


