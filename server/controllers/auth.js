const User = require("../models/user")
const {StatusCodes} = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require("../errors")

const checkUserLimit = async (req, res, next) => {
    try{
        const userCount = await User.countDocuments()
        const userLimit = 1

        if(userCount >= userLimit){
            return res.status(StatusCodes.FORBIDDEN).json({message:"User limit reached"})
        }

        next()
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal server error"})
    }
}

const register = async (req, res) => {
    try{
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({user: {name:user.name}, token})
    }catch(error){
        console.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Registration failed", error: error.message})
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body

        if(!email || !password) {
            throw new BadRequestError("Please provide email and password")
        }

        const user = await User.findOne({email})
        if(!user){
            throw new UnauthenticatedError("Invalid Credentials")
        }

        const isPasswordCorrect = await user.checkPassword(password)
        if(!isPasswordCorrect) {
            throw new UnauthenticatedError("Invalid Credentials")
        }

        const token = user.createJWT()
        res.status(StatusCodes.OK).json({user: {name:user.name}, token})
    }catch(error){
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message })
    }
}

module.exports = {
    register: [checkUserLimit, register],
    login,
}