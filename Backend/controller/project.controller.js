import { Project } from "../schemas/user.schema.js"
import { Response } from "../services/Response.js";

export const createProject = async (req,res)=>{
    try {
        const {name} = req.body;
        if(!name)return res.status(400).json({message:"Name and Owner are required"});
        const project = new Project({name});
        await project.save()
        res.status(201).json({ message: "Project created successfully", project });

    } catch (error) {
        res.status(500).json({message:"Server Error" ,error:error.message})
    }
}

export const getProject = async (req,res)=>{
    try {
        const project = await Project.find()
        res.status(200).json(project)
    } catch (error) {
        Response(res,500,error.message);
    }
}