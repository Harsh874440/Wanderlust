const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Listing=require("../models/listing.js");
const User =require("../models/user.js");
const passport=require("passport");
const {isLoggedIn} =require("../middleware.js");
const {saveRedirectUrl} =require("../middleware.js");
const listingControllers =require("../controlle/user.js");

router.get("/signup",listingControllers.renderSignup)

router.post("/signup", wrapAsync(listingControllers.signup)
);
router.get("/login",listingControllers.renderLogin)
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local",{faliureRedirect:"/login"}),
    listingControllers.login
)


router.get("/logout",listingControllers.logout)



module.exports=router;