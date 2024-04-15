const Members = require("../models/members")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, NotFoundError} = require("../errors")
const CustomError = require("../errors")
const cloudinary = require("cloudinary")
const fs = require("fs")
const members = require("../models/members")

const createMembers = async (req, res) => {
    try{
        if(!req.files || !req.files.image){
            throw new CustomError.BadRequestError("No file to upload")
        }

        const memberImage = req.files.image
        if(!memberImage.mimetype.startsWith("image")){
            throw new CustomError.BadRequestError("Please Upload an Image.")
        }

        const maxSize = 1024 * 1024
        if(memberImage.size > maxSize){
            throw new CustomError.BadRequestError("Please upload an image less than 1 mb.")
        }

        const result = await cloudinary.uploader.upload(memberImage.tempFilePath, {
            use_filename:true,
            folder:"Itachblog-members"
        })

        fs.unlinkSync(memberImage.tempFilePath)

        const member = await Members.create({
            name:req.body.name,
            role:req.body.role,
            image:result.secure_url,
        })

        res.status(StatusCodes.CREATED).json({member})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const getAllMembers = async (req, res) => {
    const members = await Members.find({})
    res.status(StatusCodes.OK).json({members})
}

const getMember = async (req, res) => {
    const {id: memberId} = req.params

    const member = await Members.findById(memberId)
    if(!memberId){
        throw new NotFoundError(`No project with id ${memberId}`)
    }
    res.status(StatusCodes.OK).json({member})
}

const editMember = async (req, res) => {
    const {id:memberId} = req.params

    try{
        let imageData
        if (req.files && req.files.image){
            const memberImage = req.files.image
            if(!memberImage.mimetype.startsWith("image")){
                throw new CustomError.BadRequestError("Please upload an Image.")
            }

            const maxSize = 1024 * 1024 
            if (memberImage.size > maxSize){
                throw new CustomError.BadRequestError("Please upload an image less than 1mb")
            }

            const result = await cloudinary.uploader.upload(memberImage.tempFilePath, {
                use_filename:true,
                folder:"Itachiblog-members"
            })

            imageData = result.secure_url

            fs.unlinkSync(memberImage.tempFilePath)
        }

        const updateMembersData = {
            ...(req.body.name && {name:req.body.name}),
            ...(req.body.role && {role:req.body.role}),
            ...(imageData && {image:imageData})
        }

        const member = await Members.findByIdAndUpdate(
            memberId,
            updateMembersData,
            {new:true, runValidators:true}
        )

        if(!member){
            throw new NotFoundError(`No member with id ${memberId}`)
        }

        res.status(StatusCodes.OK).json(member)
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json({error:error.message})
    }
}

const deleteMember = async (req, res) => {
    const {id:memberId} = req.params

    const member = await Members.findByIdAndDelete(memberId)
    if(!member){
        throw new NotFoundError(`No project with id ${memberId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    createMembers,
    getAllMembers,
    getMember,
    editMember,
    deleteMember
}