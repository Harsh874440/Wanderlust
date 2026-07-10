module.exports.isLoggedIn =(req,res,next) =>{
    if(!req.isAuthenticated()){
  req.flash("error","you are not looged in ");
 return  res.redirect("/login");
}
next();
}