import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {BadRequestError, NotFoundError, UnauthenticatedError} from '../errors/index.js'
const register = async(req, res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        console.log("F"+name);
        throw new BadRequestError("Please provide all values.");
    }
    const userExists = await User.findOne({email});
    if(userExists)
    {
        throw new BadRequestError("Email has already been registered.");
        
    }
    const user = await User.create({name: name, email, password})
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user:{email: user.email, name: user.name, lastName: user.lastName, location: user.location}, token, location: user.location})
}

const login = async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password)
    {
        throw new BadRequestError("Login failed: please provide all required values.");

    }
    const user = await User.findOne({email}).select("+password");
    if(!user)
    {
        throw new UnauthenticatedError("Login failed: invalid login, try again.")
    }
    const isPasswordGood = await user.comparePassword(password)
    if(!isPasswordGood)
    {
        console.log("###");

        throw new UnauthenticatedError("Login failed: invalid login, try again.")
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({user, token, location: user.location})
}

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ _id: req.user.userId })
  
    user.email = email
    user.name = name
    user.lastName = lastName
    user.location = location
  
    await user.save()
  
    const token = user.createJWT()
  
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
  }
  

export{register, login, updateUser}