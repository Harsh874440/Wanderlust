const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsybc.js");
const expressError=require("../utils/expressError.js");
const Listing=require("../models/listing.js");
const {isLoggedIn} =require("../middleware.js");
const {saveRedirectUrl} =require("../middleware.js");
const {isUser} =require("../middleware.js");
const { populate } = require("../models/user.js");
const listingControllers =require("../controlle/listing.js");
//index rout
router.get("/",wrapAsync ( listingControllers.index )
);

router.get("/new", isLoggedIn ,wrapAsync ( listingControllers.neeFormLoad)
);

router.get("/:id",wrapAsync (listingControllers.showListing  )
);

router.post("/", isLoggedIn ,wrapAsync ( listingControllers.newListingPost)
);

router.get("/:id/edit",  isLoggedIn ,isUser, wrapAsync ( listingControllers.editListing)
);

router.patch("/:id",isUser, isLoggedIn , wrapAsync ( listingControllers.editPatch )
);

   

router.delete("/:id", isLoggedIn ,isUser,  wrapAsync ( listingControllers.delete)
);

module.exports=router;