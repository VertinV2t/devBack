import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const getInstructors = async (req : Request, res : Response) => {
    try{
        const courses = await prisma.instructors.findMany({
            include:{
                courses : true,
            }
        })
        res.status(200).json(courses);
    }catch(error) {
        res.status(500).json(error)
    }  
}

export const getInstructorsById = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const courses = await prisma.instructors.findUnique({
            where:{
                id : parseInt(id),
            },
            include:{
                courses : true,
            }
        })
        res.status(200).json(courses);
    }catch(error){
        res.status(500).json(error);
    }
}

export const newInstructor = async (req : Request, res : Response) => {
    try{
        const {name, bio} = req.body;
        await prisma.instructors.create({
            data:{
                name : name,
                bio : bio,
            }
        })
        res.status(200).json({message: `${name} added.`})
    }catch(error){
        res.status(500).json(error);
    }
}

export const deleteInstructor = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        await prisma.instructors.delete({
            where: {
                id : parseInt(id),
            }
        })
        res.status(200).json({message : `${id} removed`})
    }catch(error){
        res.status(500).json(error)
    }
}

export const updateInstructorInfo = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const {name, bio, courseId} = req.body;
        if (name != null){
            await prisma.instructors.update({
                where:{
                    id: parseInt(id),
                },
                data:{
                    name: name,
                }
            })
        }
        if (bio != null){
            await prisma.instructors.update({
                where:{
                    id: parseInt(id),
                },
                data:{
                    bio: bio,
                }
            })
        }
        if (courseId != null){
            await prisma.instructors.update({
                where: {
                    id: parseInt(id),
                },
                data:{
                    courses:{
                        disconnect:{
                            id: parseInt(courseId),
                        }
                    }
                }
            })
        }
        res.status(200).json({message : `${id} updated`})
    }catch(error){
        res.status(500).json(error)
    }
}