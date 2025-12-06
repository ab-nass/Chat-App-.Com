import express from "express"
import dotenv from 'dotenv'
import dbConnect from "./DB/dbConnect.js";

const app = express();

dotenv.config();

app.get("/", (req, res) => {
    res.send("Server is working");
})



 const PORT = process.env.PORT 
app.listen(PORT, () =>  {
    dbConnect();
    console.log(`listening at port ${PORT}`);

}) 