const User=require("../models/user");
module.exports.renderSignupFrom=(req,res)=>{
    res.render("./users/signup.ejs");
};
module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registredUser=await User.register(newUser,password);
        console.log(registredUser);
        req.login(registredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("sucess","user registered succcessfully");
            res.redirect("/listings");
        })
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};
module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs");
};
module.exports.login=async(req,res)=>{
    req.flash("sucess","Welcome you are logged in");
    console.log(req.session.redirectUrl);
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("sucess","you are logout ");
        res.redirect("/listings");
    })
};