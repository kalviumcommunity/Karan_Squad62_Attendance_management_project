const express = require("express");
const router = express.Router();
const User = require("../Models/UserModels.js");


router.get("/",async(req,res)=>{
try
{
    const user = await User.find();
    res.json(user);
}
catch(err)
{
    res.status(500).json({err:"Failed to get users"});
}
});
module.exports = router;
