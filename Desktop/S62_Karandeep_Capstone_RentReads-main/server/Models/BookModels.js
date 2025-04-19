const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
title: String,
author: String,
coverImage: String, 
pdfUrl: String,
uploadedBy:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
uploadedAt:{type: Date, default: Date.now}
});

module.exports = mongoose.model("Book", BookSchema);