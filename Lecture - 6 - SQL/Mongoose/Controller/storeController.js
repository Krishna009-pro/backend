const Favorite = require("../Models/favouriteModel");
const Home = require("../Models/homeModels");

exports.getHomes = (req, res) => {
    Home.find()
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
    // Favorite.find()
    //     .then((Favorites) => {
    //         if (!Favorites) {
    //             return res.redirect("/favorites-list");
    //         }
    //         const FavoritesIds = Favorites.map((fav) => fav.houseId.toString());
    //         Home.find()
    //             .then((registeredHomes) => {
    //                 if (!registeredHomes) {
    //                     return res.redirect("/favorites-list");
    //                 }
    //                 const favHomes = registeredHomes.filter((home) => FavoritesIds.includes(home._id.toString()));
    //                 res.render('favorites-list', {
    //                     favoriteHomes: favHomes,
    //                     currentPage: "favorites-list",
    //                     PageTitle: "Favorites List Page"
    //                 });
    //             })
    //             .catch(err => console.error("Select Query failed:", err.message));
    //     })
    //     .catch(err => console.error("Select Query failed:", err.message));

    // easy way to do this
    Favorite.find()
        .populate("houseId")
        .then((fav) => {
            const favHomes = fav.map((fav) => fav.houseId);
            res.render('favorites-list', {
                favoriteHomes: favHomes,
                currentPage: "favorites-list",
                PageTitle: "Favorites List Page"
            });
        })
        .catch(err => console.error("Select Query failed:", err.message));

};

exports.getIndex = (req, res) => {
    Home.find()
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
    Home.findById(homeid)
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
    const id = req.body.homeid;
    Favorite.findOne({ houseId: id })
        .then((existingFavorite) => {
            if (existingFavorite) {
                console.log("Favorite already exists");
                return res.redirect("/favorites-list");
            }
            fav = new Favorite({ houseId: id });
            fav.save()
                .then(() => {
                    res.redirect("/favorites-list");
                })
                .catch(err => console.error("Insert Query failed:", err.message));
        })
        .catch(err => console.error("Select Query failed:", err.message));
};

exports.postRemoveFromFavrites = (req, res) => {
    Favorite.findOneAndDelete({ houseId: req.params.id })
        .then(() => {
            res.redirect("/favorites-list");
        })
        .catch(err => console.error("Delete Query failed:", err.message));
}