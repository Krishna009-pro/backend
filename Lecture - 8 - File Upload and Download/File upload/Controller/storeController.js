const User = require("../Models/userModel");
const Home = require("../Models/homeModels");

exports.getHomes = (req, res) => {
    Home.find()
        .then((registeredHomes) => {
            res.render('home-list', {
                registeredHomes: registeredHomes,
                currentPage: "home-list",
                PageTitle: "Home Page",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            });
        })
        .catch(err => console.error("Select Query failed:", err.message));
};

exports.getBookings = (req, res) => {
    Home.find()
        .then((registeredHomes) =>
            res.render('bookings', {
                registeredHomes: registeredHomes,
                currentPage: "bookings",
                PageTitle: "Bookings Page",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            }))
        .catch(err => console.error("Select Query failed:", err.message));
};

exports.getFavoritesList = async (req, res) => {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("favourites"); // populate() is a Mongoose method used to replace a referenced ObjectId with the actual document data from another collection.
    res.render('favorites-list', {
        favoriteHomes: user.favourites,
        currentPage: "favorites-list",
        PageTitle: "Favorites List Page",
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    });

};

exports.getIndex = (req, res) => {
    Home.find()
        .then((registeredHomes) => {
            res.render('index', {
                registeredHomes: registeredHomes,
                currentPage: "index",
                PageTitle: "index Page",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            });
        })
        .catch(err => console.log("Select query", err));
};

exports.getHomeDetails = (req, res) => {
    const homeid = req.params.id;
    console.log(homeid);
    Home.findById(homeid)
        .then((home) => {
            if (!home) {
                return res.redirect("/home-list");
            }
            res.render("home-details", {
                selectedHome: home,
                currentPage: "home-details",
                PageTitle: "Home Details Page",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            });
        });
};

exports.AddToFavorites = async (req, res) => {
    const homeId = req.body.homeid;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if (!user.favourites.includes(homeId)) {
        user.favourites.push(homeId);
        await user.save();
    }

    res.redirect("/favorites-list");

};

exports.postRemoveFromFavrites = async (req, res) => {
    const homeid = req.params.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if (user.favourites.includes(homeid)) {
        user.favourites.pull(homeid);
        await user.save();
    }
    res.redirect("/favorites-list");
}