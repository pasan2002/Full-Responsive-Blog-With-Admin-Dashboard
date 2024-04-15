const Posts = require("../models/posts")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")
const CustomError = require("../errors")
const cloudinary = require("cloudinary")
const fs = require("fs")
const { title } = require("process")
const auth = require("./auth")

const createPosts = async (req, res) => {
    try{
        if(!req.files || !req.files.image){
            throw new CustomError.BadRequestError("No file to upload")
        }

        const postImage = req.files.image
        if(!postImage.mimetype.startsWith("image")){
            throw new CustomError.BadRequestError("Please Upload an Image")
        }

        const maxSize = 1024 * 1024
        if(postImage.size > maxSize){
            throw new CustomError.BadRequestError("Please upload less than 1mb image")
        }

        const result = await cloudinary.uploader.upload(postImage.tempFilePath, {
            use_filename:true,
            folder: "Itachiblog-posts"
        })

        fs.unlinkSync(postImage.tempFilePath)

        const post = await Posts.create({
            title:req.body.title,
            imageSrc:result.secure_url,
            description:req.body.description,
            author:req.body.author,
            language:req.body.language,
            linktitle:req.body.linktitle,
        })

        res.status(StatusCodes.CREATED).json({post})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const getAllPosts = async (req, res) => {
    const posts = await Posts.find({})
    res.status(StatusCodes.OK).json({posts})
}

const getPost = async (req, res) => {
    const {id: postId} = req.params

    const post = await Posts.findById(postId)
    if(!postId){
        throw new NotFoundError(`No project with id ${postId}`)
    }
    res.status(StatusCodes.OK).json({post})
}

const editPost = async (req, res) => {
    const {id:postId} = req.params

    try{
        let imageData
        if (req.files && req.files.image){
            const postImage = req.files.image
            if(!postImage.mimetype.startsWith("image")){
                throw new CustomError.BadRequestError("Please upload an Image")
            }

            const maxSize = 1024 * 1024 
            if (postImage > maxSize){
                throw new CustomError.BadRequestError("Please upload an image less than 1mb")
            }

            const result = await cloudinary.uploader.upload(postImage.tempFilePath, {
                use_filename:true,
                folder:"Itachiblog-posts"
            })

            imageData = result.secure_url

            fs.unlinkSync(postImage.tempFilePath)
        }

        const updatedPostData = {
            ...(req.body.title && {title:req.body.title}),
            ...(req.body.description && {description:req.body.description}),
            ...(imageData && {imageSrc:imageData}),
            ...(req.body.author && {author:req.body.author}),
            ...(req.body.language && {language:req.body.language}),
            ...(req.body.linktitle && {linktitle:req.body.linktitle})
        }

        const post = await Posts.findByIdAndUpdate(
            postId,
            updatedPostData,
            {new:true, runValidators:true}
        )

        if(!post){
            throw new NotFoundError(`No post with id ${postId}`)
        }

        res.status(StatusCodes.OK).json(post)
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const deletePost = async (req, res) => {
    const {id:postId} = req.params

    const post = await Posts.findByIdAndDelete(postId)
    if(!post){
        throw new NotFoundError(`No project with id ${postId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    createPosts,
    getAllPosts,
    getPost,
    editPost,
    deletePost
}