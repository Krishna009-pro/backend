const Favorites = require("../Models/favouriteModel");
const Home = require("../Models/homeModels");

exports.getHomes = (req, res) => {
    Home.getAllHomes()
        .then((registeredHomes) => {
            res.render('home-list', {
                registeredHomes: registeredHomes,
                currentPage: "home-list",
                PageTitle: "Home Page"
            });
        })
        .catch(err => console.error("Select Query failed:", err.message));
};

exports.getBookings = (req, res) => {
    Home.getAllHomes()
        .then(([registeredHomes]) =>
            res.render('bookings', {
                registeredHomes: registeredHomes,
                currentPage: "bookings",
                PageTitle: "Bookings Page"
            }))
        .catch(err => console.error("Select Query failed:", err.message));
};

exports.getFavoritesList = (req, res) => {
    Favorites.getAllFavorites()
        .then((FavoriteHomes) => {
            res.render('favorites-list', {
                favoriteHomes: FavoriteHomes,
                currentPage: "favorites-list",
                PageTitle: "Favorites List Page"
            });
        })
        .catch(err => console.error("Select Query failed:", err.message));

};

exports.getIndex = (req, res) => {
    Home.getAllHomes()
        .then((registeredHomes) => {
            res.render('index', {
                registeredHomes: registeredHomes,
                currentPage: "index",
                PageTitle: "index Page"
            });
        })
        .catch(err => console.log("Select query", err));
};

exports.getHomeDetails = (req, res) => {
    const homeid = req.params.id;
    console.log(homeid);
    Home.getHomeDetails(homeid)
        .then((home) => {
            if (!home) {
                return res.redirect("/home-list");
            }
            res.render("home-details", {
                selectedHome: home,
                currentPage: "home-details",
                PageTitle: "Home Details Page"
            });
        });
};

exports.AddToFavorites = (req, res) => {
    const homeid = req.body.homeid;
    Favorites.addToFavourite(homeid)
        .then(() => {
            res.redirect("/favorites-list");
        })
        .catch(err => console.error("Insert Query failed:", err.message));
};

exports.postRemoveFromFavrites = (req, res) => {
    Favorites.removeFromFavorites(req.params.id)
        .then(() => {
            res.redirect("/favorites-list");
        })
        .catch(err => console.error("Delete Query failed:", err.message));
}