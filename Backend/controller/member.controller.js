import { User } from "../schemas/user.schema.js";
import { Response } from "../services/Response.js";
import bcrypt from 'bcryptjs';

export const addMember = async(req,res) => {
    try {
        const {name,email,password} = req.body;
        const hanshedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password : hanshedPassword,createdBy : req.user.userId, role : 'user'})
        return Response(res,200,'User created successfully',user)
    } catch (error) {
        return Response(res,500,error.message)
    }
}

