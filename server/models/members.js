const mongoose = require("mongoose")

const membersSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true, "Please enter the name."]
    },
    role : {
        type:String,
        required:[true, "Please enter the role."]
    },
    image: {
        type:String,
        required:[true, "Please upload an image."]
    }
})

module.exports = mongoose.model("members", membersSchema)