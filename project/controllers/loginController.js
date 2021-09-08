const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render("register/login", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    //login();
    // console.log(req);
    login(req, res);

});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

function login(req, res) {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ $or: [{ email: username }, { phone: username }] }).then(user => {
        if (user) {
            if (password == user.password) {
                res.render("employee/addOrEdit", {
                    viewTitle: "Create Employee"
                });
               
            } else {
                res.render("register/login", {
                    message: "password does not matched"
                });

            }
            // bcrypt.compare(password, user.password, function (err, result) {
            //     if (err) {
            //         res.json({
            //             error: err
            //         })
            //     }
            //     if (result) {
            //         let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1h' })
            //        res.render("employee/addOrEdit", {
            //         viewTitle: "Create Employee"
            //     });
            //     } else {
            //         res.render("register/login", {
            //             message: "password does not matched"
            //         });
            //     }
            // })
        } else {
            res.render("register/login", {
                message: "No user found, please check your login credentials"
            });
        }
    })
}
module.exports = router;