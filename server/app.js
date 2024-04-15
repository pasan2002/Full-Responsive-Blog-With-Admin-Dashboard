require("dotenv").config()
require("express-async-errors")

const cors = require("cors")
const path = require('path');

const express = require("express")
const app = express()

//file uploading
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary").v2

//use v2
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})


//connectDB
const connectDb = require("./db/connect")
const authenticateUser = require("./middleware/authentication")

//post router
const postRouter = require("./routes/posts")
const publicRouter = require("./routes/public")

//members router
const membersRouter = require("./routes/member")

//error handler
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

//body parser 
app.use(express.json())
app.use(fileUpload({useTempFiles:true}))
app.use(cors({
    origin: 'https://blog-pi-five-15.vercel.app', 
    credentials: true
}));

//Routers
const authRouter = require("./routes/auth")

//Mounting Routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/posts", authenticateUser, postRouter)
app.use("/api/v1/public", publicRouter)
app.use("/api/v1/member", authenticateUser, membersRouter)

//Error handling middleware
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

app.use(express.static(path.join(__dirname, './client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

const port = process.env.PORT || 3000

const start = async() => {
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(port, "0.0.0.0", () => {
            console.log(`Serevr is listening on port ${port}....`);
        })
    }catch(error){
        console.log(error);
    }
}

start()

module.exports = app
