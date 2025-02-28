import { Project, ProjectMember, User } from "../schemas/user.schema.js"
import { Response } from "../services/Response.js";

export const createProject = async (req,res)=>{
    try {
        
        const {name,description} = req.body;
        const userId = req.user.userId;

        const project = await Project.create({name,description,owner:userId})

        return Response(res,201,'Project created successfully',project)

    } catch (error) {
        return Response(res,500,error.message)
    }
}


export const getProject = async (req,res)=>{
    try {
        const userId = req.user.userId;
        const projects = await Project.find({owner : userId})
        return Response(res,200,'Projects fetched successfully',projects)
    } catch (error) {
        return Response(res,500,error.message)
    }
}

export const updateProject = async (req,res) => {
    try {
        const {project_id} = req.params;

        const {name,description} = req.body;
        const userId = req.user.userId;
        const project = await Project.findById({_id : project_id})

        if(project.owner.toString() !== userId){
            return Response(res,401,'Unauthorized, you are not the owner of this project')
        }

        project.name = name;
        project.description = description;

        await project.save();

        return Response(res,200,'Project updated successfully',project)

    } catch (error) {
        return Response(res,500,error.message)
    }
}


export const deleteProject = async (req,res) => {
    try {
        
    } catch (error) {
        return Response(res,500,error.message)
    }
}


// 67c21de358dc989ddfae4743

export const assignProject = async (req,res) => {
    try {
        const {projectId,userId} = req.body;

        // verification

        const project = await Project.findById(projectId)
        if(!project || project.owner.toString() !== req.user.userId){
            return Response(res,404,'Project not found')
        }

        const user = await User.findById(userId)

        if(!user || user.createdBy.toString() !== req.user.userId || user.role !== 'user'){
            return Response(res,404,'User not found')
        }


        // assign project to user

        const projectAssign = await ProjectMember.create({project : projectId, member : userId})

        return Response(res,200,'Project assigned to user successfully',projectAssign)
        
        
    } catch (error) {
        return Response(res,500,error.message)
    }
}

