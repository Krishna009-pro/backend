exports.getLogin = (req, res) => {
    res.render('login', {
        currentPage: "login",
        PageTitle: "Login",
        isLoggedIn: false
    })
}

exports.postLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password);
    req.session.isLoggedIn = true;
    res.redirect("/");
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}