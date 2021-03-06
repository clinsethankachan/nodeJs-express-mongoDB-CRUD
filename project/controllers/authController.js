const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt= require('jsonwebtoken');
const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render("register/register", {
        viewTitle: "Insert Employee"
    });
});

const register=(req,res,next)=>{
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

const login=(req,res,next)=>{
    var username=req.body.username
    var password=req.body.password

    User.findOne({$or:[{email:username},{phone:username}]}).then(user=>{
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(err){
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token=jwt.sign({name:user.name},'verySecretValue',{expiresIn:'1h'})
                    res.json({
                        message:'Login successful',
                        token
                    })
                }else{
                    res.json({
                        message:'password does not matched'
                    })
                }
            })
        }else{
            res.json({
                message:'No user found'
            })
        }
    })
}
module.exports={register,login}