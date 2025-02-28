import { User } from "../schemas/user.schema.js"
import { Response } from "../services/Response.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async (req,res) => {
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(user){
            return Response(res,400,"User already exists")
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            email,
            password : hashedPassword
        })

        await newUser.save()
        
        return Response(res,201,"User created successfully",{
            user : newUser
        })

    } catch (error) {
        return Response(res,500,error.message)
    }
}


export const login = async (req,res) => {
    console.log('someone is login')
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})

        if(!user){
            return Response(res,400,"User not found")
        }

        const isPasswordValid = bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return Response(res,400,"Invalid password")
        }

        const token = jwt.sign({userId : user._id},process.env.JWT_SECRET,{expiresIn : '5h'})

        return Response(res,200,"User logged in successfully",{
            token,
            user
        })
        
    } catch (error) {
        return Response(res,500,error.message)
    }
}

export const me = async (req,res) => {
    try {
        const user = await User.findById({_id : req.user.userId})
        console.log({user})
        Response(res,200,'User fetched successfully',{
            user
        })
    } catch (error) {
        return Response(res,500,error.message)
    }
}