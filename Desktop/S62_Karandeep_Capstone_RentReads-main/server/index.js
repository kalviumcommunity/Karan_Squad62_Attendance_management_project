const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path:"./config/.env" });

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected to MongoDb"))
.catch((err) => console.log("MongoDB connection error:", err));

const userRoutes = require("./Routes/UserRoutes.js");
const bookRoutes = require("./Routes/BookRoutes.js");

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.get("/",async(req,res)=>{
    res.send("Backend is properly working");
});

app.listen(process.env.PORT,()=>console.log(`http://localhost:${process.env.PORT}`));


