import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import {path} from "path";
import bodyParser from "body-parser"; 
import {app,server} from "./lib/socket.js"


dotenv.config()


const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(bodyParser.json({ limit: '50mb' })); // JSON için boyut limiti.
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // URL encoded veriler için.


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }


server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
    connectDB()
});