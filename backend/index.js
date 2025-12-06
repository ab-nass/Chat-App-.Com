import express from "express"
import dotenv from 'dotenv'
import dbConnect from "./DB/dbConnect.js";
import authRouter from './Routes/authUser.js'

const app = express();

dotenv.config();

app.use(express.json());

app.use('/api/auth', authRouter)




app.get("/", (req, res) => {
    res.send("Server is working");
})







 const PORT = process.env.PORT 
app.listen(PORT, () =>  {
    dbConnect();
    console.log(`listening at port ${PORT}`);

}) 