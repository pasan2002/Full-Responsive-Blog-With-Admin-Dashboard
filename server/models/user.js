const mongoose =  require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a username"],
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:[true, "Email address is required"],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:60,
    }
})

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT =function() {
    return jwt.sign({userID:this._id, name:this.name}, process.env.JWT_SECRET,
    {expiresIn:process.env.JWT_LIFETIME}
    )
}

UserSchema.methods.checkPassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("user", UserSchema)