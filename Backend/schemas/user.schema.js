import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : String,
    password : String,
    role : {
        type : String,
        enum : ['admin','user'],
        default : 'user'
    }
},{timestamps : true})

export const User = mongoose.model('User',userSchema)


const projectSchema = new mongoose.Schema({
    name : String,
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{timestamps : true})

export const Project = mongoose.model('Project',projectSchema)

// users
const ProjectMemberSchema = new mongoose.Schema({
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    member : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
})

export const ProjectMember = mongoose.model('ProjectMember',ProjectMemberSchema)



const taskSchema = new mongoose.Schema({
    title : String,
    description : String,
    status : {
        type : String,
        enum : ['pending','in_progress','completed','cancelled'],
        default : 'pending'
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    },
    assignedTo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dueDate : Date,
    priority : {
        type : String,
        enum : ['low','medium','high'],
        default : 'medium'
    },
    
},{timestamps : true})

export const Task = mongoose.model('Task',taskSchema)