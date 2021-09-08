const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');

router.get('/', (req, res) => {
    res.render("register/register", {
        viewTitle: "Insert Employee"
    });
});

function register(req,res,next){
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user=new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass
        })
    
        user.save()
        .then(user=>{
            res.json({
                message:'User added successfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'Error occured'
            })
        })
    })
}
module.exports = router;