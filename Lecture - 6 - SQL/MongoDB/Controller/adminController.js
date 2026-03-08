const Home = require("../Models/homeModels");

exports.getAddHome = (req, res) => {
    res.render('add-home', {
        currentPage: "add-home",
        PageTitle: "Add Home to airbnb",
        editing: false,
        home: null
    });
};


exports.postAddHome = (req, res) => {
    const home = new Home(req.body.homename, req.body.price, req.body.location, req.body.rating, req.body.imageUrl, req.body.description);
    home.save()
        .then(() => {
            res.render('added-home', {
                currentPage: "added-home",
                PageTitle: "Successfully added Home to airbnb"
            })
        })
        .catch(err => console.error("Connection failed:", err.message));

};


exports.getAdminHomes = (req, res) => {
    Home.getAllHomes()
        .then((registeredHomes) => {
            res.render('admin-home-list', {
                registeredHomes: registeredHomes,
                currentPage: "admin-home-list",
                PageTitle: "AdminHome Page"
            })
        })
        .catch(err => console.error("Connection failed:", err.message));

};


exports.getEditHome = (req, res) => {
    const homeid = req.params.id;
    const editing = req.query.editing === "true";
    Home.getHomeDetails(homeid)
        .then((home) => {
            if (!home) {
                console.log("home not found");
                return res.redirect("/admin/admin-home-list");
            }
            res.render('add-home', {
                currentPage: "admin-home-list",
                PageTitle: "Add Home to airbnb",
                editing: editing,
                home: home
            });
        })
        .catch(err => console.error("Connection failed:", err.message));
}

exports.postEditHome = (req, res) => {
    const home = new Home(req.body.homename, req.body.price, req.body.location, req.body.rating, req.body.imageUrl, req.body.description, req.body._id);
    home.save()
        .then(() => {
            res.redirect("/admin/admin-home-list")
        })
        .catch(err => console.error("Connection failed:", err.message));
};

exports.postDeleteHome = (req, res) => {
    const homeid = req.params.id;
    Home.deleteHome(homeid)
        .then(() => {
            res.redirect("/admin/admin-home-list")
        })
        .catch(err => console.error("Connection failed:", err.message));
};