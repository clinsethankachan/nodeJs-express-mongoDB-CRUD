    const mongoose=require('mongoose');

    const Schema=mongoose.Schema;
    const userSchema=new Schema({
        name:{
            type:String
        },
        email:{
            type:String
        },
        phone:{
            type:String
        },
        password:{
            type:String
        }
    },{timestamps:true})


    // Custom validation for email
    userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

    const user=mongoose.model('user',userSchema);
    module.exports=user;