const mongoose = require("mongoose")

const PostsSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true, "Please enter the title."]
    },
    imageSrc : {
        type: String,
        required: [true, "Please upload an image."]
    },
    description : {
        type: String,
        required: [true, "Please enter description about the movie."]
    },
    author : {
        type: String,
        required: [true, "Enter authors name."]
    },
    language: {
        type: String,
        required: [true, "Please provide the language of the movie."]
    },
    linktitle: {
        type: String,
        required: [true, "Please provide a title for the link"]
    }
})

module.exports = mongoose.model("posts", PostsSchema)