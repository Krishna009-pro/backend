exports.getLogin = (req, res) => {
    res.render('login', {
        currentPage: "login",
        PageTitle: "Login",
        isLoggedIn: req.isLoggedIn
    })
}

exports.postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    res.cookie("isLoggedIn", true);
    res.redirect("/");
}

exports.postLogout = (req, res) => {
    res.clearCookie("isLoggedIn"); // or res.cookie("isLoggedIn", false);
    res.redirect('/');
}