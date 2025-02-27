import { ProjectMember } from "../schemas/user.schema";
import { Response } from "../services/Response";

export const Member = async (req,res)=>{

    try {
        const {project,member} = req.body;
        if(!project || !member)return Response(res,400,"Fields cannot be empty")
        const newMember = new ProjectMember({project,member})
        await newMember.save() 
        Response(res,200,"User created successfully")
    } catch (error) {
        Response(res,500,"Server Error")
    }
}