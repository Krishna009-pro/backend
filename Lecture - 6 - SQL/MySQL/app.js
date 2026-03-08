const { storeRouter } = require('./Routes/storeRouter');
const { adminRouter } = require('./Routes/adminRouter');
const errorController = require('./Controller/errorController');

const express = require("express");
const app = express();

app.set("view engine", 'ejs');
app.set('views', ['views', 'views/store', 'views/admin']);

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(storeRouter);
app.use("/admin", adminRouter);


app.use("/", errorController.pageNotFound);

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});