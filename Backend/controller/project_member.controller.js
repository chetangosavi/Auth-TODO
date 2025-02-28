import { Project, ProjectMember } from "../schemas/user.schema.js";
import { Response } from "../services/Response.js"

export const getProjects = async(req,res) => {
    try {
        const userId = req.user.userId;
        
        // const projects = await ProjectMember.find({member : userId})

        // const projectIds = projects.map(project => project.project)

        // const projectsData = await Project.find({_id : {$in : projectIds}})

        // const projects = await ProjectMember.aggregate([
        //     {
        //         $match : {
        //             member : userId
        //         }
        //     },
        //     {
        //         $lookup : {
        //             from : 'Projects',
        //             localField : 'project',
        //             foreignField : '_id',
        //             as : 'projectData'
        //         }
        //     },
        //     {
        //         $unwind : '$projectData'
        //     },
        //     {
        //         $project : {
        //             _id : '$projectData._id',
        //             name : '$projectData.name',
        //             description : '$projectData.description',
        //             status : '$projectData.status',
        //             userId : '$projectData.owner'
        //         }
        //     }
        // ])

        return Response(res,200,'Projects fetched successfully',projects)
    } catch (error) {
        return Response(res,500,error.message)
    }
}