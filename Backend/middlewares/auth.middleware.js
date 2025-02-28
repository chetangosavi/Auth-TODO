import { User } from "../schemas/user.schema.js"
import { Response } from "../services/Response.js"
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req,res,next) => {
    try {
        // bearer toadadasdasdasdaken
        const token = req.headers.authorization.split(' ')[1]
        console.log({token})
        if(!token){
            return Response(res,401,'Unauthorized User')
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // req object
        // decoded = {userId : 'adadsadsadsdsa'}
        req.user = decoded // userId
        next()
    } catch (error) {
        return Response(res,401,'Unauthorized')
    }
}


// is admin
export const isAdmin = async (req,res,next) => {
    try {
        let userId =  req.user.userId;
        const user = await User.findById({_id : userId})
        
        if(user.role !== 'admin'){
            return Response(res,401,'Unauthorized')
        }
        next()
    } catch (error) {
        return Response(res,401,'Unauthorized')
    }
}

export const isUser = async (req,res,next) => {
    try {
        let userId =  req.user.userId;
        const user = await User.findById({_id : userId})
        
        if(user.role !== 'user'){
            return Response(res,401,'Unauthorized')
        }
        next()
    } catch (error) {
        return Response(res,401,'Unauthorized')
    }
}