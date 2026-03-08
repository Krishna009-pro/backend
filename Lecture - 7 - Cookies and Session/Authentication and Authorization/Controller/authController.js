const { check, validationResult } = require("express-validator");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
    res.render('login', {
        currentPage: "login",
        PageTitle: "Login",
        isLoggedIn: false,
        errors: [],
        oldInput: { username: "" },
        user: {}
    })
}

exports.postLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ email: username });
    if (!user) {
        return res.status(422).render("auth/login", {
            currentPage: "login",
            PageTitle: "Login",
            isLoggedIn: false,
            errors: ["User not found"],
            oldInput: { username, password },
            user: {}
        });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        return res.status(422).render("auth/login", {
            currentPage: "login",
            PageTitle: "Login",
            isLoggedIn: false,
            errors: ["Invalid password"],
            oldInput: { username, password },
            user: {}
        });
    }
    req.session.isLoggedIn = true;
    req.session.user = {
        _id: user._id.toString(),
        email: user.email,
        userType: user.userType
    };
    res.redirect("/");
}

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.getSignup = (req, res) => {
    res.render('register', {
        currentPage: "register",
        PageTitle: "register",
        isLoggedIn: false,
        errors: [],
        oldInput: { firstName: "", lastName: "", email: "", password: "", userType: "" },
        user: {}

    })
}

exports.postSignup = [

    check('firstName')
        .trim()
        .isLength({ min: 5 })
        .withMessage("First Name should be atleast 5 character long")
        .matches(/^[a-zA-Z ]+$/)
        .withMessage("First Name can only contain alphabets and spaces"),

    check('lastName')
        .matches(/^[a-zA-Z ]+$/)
        .withMessage("Last Name can only contain alphabets and spaces"),

    check('email') // for email or username
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),

    check('password')
        .isLength({ min: 5 })
        .trim()
        .withMessage("Password should be atleast 5 charachter long")
        .matches(/[A-Z]/) // must contain at least one uppercase letter
        .withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/) // must contain at least one number
        .withMessage("Password must contain at least one number")
        .matches(/[a-z]/) // must contain at least one lowercase letter
        .withMessage("Password must contain at least one lowercase letter")
        .matches(/[!@#]/) // must contain at least one special character
        .withMessage("Password must contain at least one special character"),

    check('confirmPassword')
        .trim()
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match'),

    check("userType")
        .notEmpty()
        .withMessage("Please select a valid user type")
        .isIn(["user", "admin"])
        .withMessage("Please select a valid user type"),

    check("terms")
        .notEmpty()
        .withMessage("Please accept the terms and conditions"),

    (req, res, next) => {
        const { firstName, lastName, email, password, userType } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).render("auth/register", {
                currentPage: "register",
                PageTitle: "register",
                isLoggedIn: false,
                errors: errors.array().map(err => err.msg), // only message
                oldInput: { firstName, lastName, email, password, userType },
                user: {}
            });
        }
        bcrypt.hash(password, 10).then((hashpassword) => {
            User.create({
                firstName,
                lastName,
                email,
                password: hashpassword,
                userType
            })
                .then(() => {
                    console.log("User created successfully");
                    res.redirect("/auth/login");
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(422).render("auth/register", {
                        currentPage: "register",
                        PageTitle: "register",
                        isLoggedIn: false,
                        errors: ["Something went wrong", err.message],
                        oldInput: { firstName, lastName, email, password, userType },
                        user: {}
                    })
                });
        });
    }]