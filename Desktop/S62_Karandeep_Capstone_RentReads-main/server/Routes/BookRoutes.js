const express = require("express");
const router = express.Router();
const Book = require("../Models/BookModels.js")

router.get("/",async(req,res)=>{
    try
    {
        const book = await Book.find().populate("uploadedBy", "username");
        res.json(book);
    }
    catch(err)
    {
        res.status(500).json({err:"Failed to get book"});
    }
});
module.exports = router;