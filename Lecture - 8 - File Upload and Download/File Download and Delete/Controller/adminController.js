const fs = require("fs");

const Home = require("../Models/homeModels");



exports.getAddHome = (req, res) => {
    res.render('add-home', {
        currentPage: "add-home",
        PageTitle: "Add Home to airbnb",
        editing: false,
        home: null,
        isLoggedIn: req.session.isLoggedIn,
        user: req.session.user
    });
};


exports.postAddHome = (req, res) => {
    const { homename, price, location, rating, description } = req.body;
    const newHome = new Home({ homename, price, location, rating, description });

    // Image is required
    if (!req.files || !req.files.image) {
        return res.status(422).send("Image file is required")
    }
    newHome.photo = `/Data/homeImages/${req.files.image[0].filename}`;

    // RulesFile is optional
    if (req.files.rulesFile && req.files.rulesFile[0]) {
        newHome.rulesFile = `/Data/homeRules/${req.files.rulesFile[0].filename}`;
    }

    console.log("Files:", newHome.photo, newHome.rulesFile);
    newHome.save()
        .then(() => {
            res.render('added-home', {
                currentPage: "added-home",
                PageTitle: "Successfully added Home to airbnb",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        })
        .catch(err => console.error("Connection failed:", err.message));

};


exports.getAdminHomes = (req, res) => {
    Home.find()
        .then((registeredHomes) => {
            res.render('admin-home-list', {
                registeredHomes: registeredHomes,
                currentPage: "admin-home-list",
                PageTitle: "AdminHome Page",
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            })
        })
        .catch(err => console.error("Connection failed:", err.message));

};


exports.getEditHome = (req, res) => {
    const homeid = req.params.id;
    const editing = req.query.editing === "true";
    Home.findById(homeid)
        .then((home) => {
            if (!home) {
                console.log("home not found");
                return res.redirect("/admin/admin-home-list");
            }
            res.render('add-home', {
                currentPage: "admin-home-list",
                PageTitle: "Add Home to airbnb",
                editing: editing,
                home: home,
                isLoggedIn: req.session.isLoggedIn,
                user: req.session.user
            });
        })
        .catch(err => console.error("Connection failed:", err.message));
}

exports.postEditHome = (req, res) => {
    const { _id, homename, price, location, rating, description } = req.body;
    Home.findById(_id)
        .then((home) => {
            if (!home) {
                throw new Error("Home not found");
            }
            home.homename = homename;
            home.price = price;
            home.location = location;
            home.rating = rating;
            home.description = description;
            // Update rules file if new one uploaded
            if (req.files && req.files.rulesFile && req.files.rulesFile[0]) {
                // Delete old file if exists
                if (home.rulesFile && fs.existsSync(home.rulesFile)) {
                    try {
                        fs.unlinkSync(home.rulesFile);
                    } catch (err) {
                        console.error("Error deleting old rules file:", err.message);
                    }
                }
                home.rulesFile = `/Data/homeRules/${req.files.rulesFile[0].filename}`;
            }

            // Update image if new one uploaded
            if (req.files && req.files.image && req.files.image[0]) {
                // Delete old file if exists
                if (home.photo && fs.existsSync(home.photo)) {
                    try {
                        fs.unlinkSync(home.photo);
                    } catch (err) {
                        console.error("Error deleting old image:", err.message);
                    }
                }
                home.photo = `/Data/homeImages/${req.files.image[0].filename}`;
            }
            return home.save();
        })
        .then(() => {
            res.redirect("/admin/admin-home-list")
        })
        .catch(err => console.error("Error while redirecting to admin-home-list:", err.message));
};

exports.postDeleteHome = (req, res) => {
    const homeid = req.params.id;
    Home.findByIdAndDelete(homeid)
        .then(() => {
            res.redirect("/admin/admin-home-list")
        })
        .catch(err => console.error("Connection failed:", err.message));
};