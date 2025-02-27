import { Project } from "../schemas/user.schema.js"

export const createProject = async (req,res)=>{
    try {
        const {name,owner} = req.body;
        if(!name || !owner)return res.status(400).json({message:"Name and Owner are required"});
        const project = new Project({name,owner});
        await project.save()
        res.status(201).json({ message: "Project created successfully", project });

    } catch (error) {
        res.status(500).json({message:"Server Error" ,error:error.message})
    }
}