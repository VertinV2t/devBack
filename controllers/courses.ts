import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const getCourses = async (req : Request, res : Response) => {
    try{
        const {title, level} = req.body;
        var courses;
        if (title != null){
            courses = await prisma.courses.findMany({
                where:{
                    title: title,
                }
            })
        }
        if (level != null){
            courses = await prisma.courses.findMany({
                where:{
                    level: parseInt(level),
                }
            })
        }
        else {
            courses = await prisma.courses.findMany({
            })
        }
        res.status(200).json(courses);
    }catch(error) {
        res.status(500).json(error)
    }  
}

export const getCoursesById = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const courses = await prisma.courses.findUnique({
            where:{
                id : parseInt(id),
            },
            include:{
                enrollments: true
            }
        })
        res.status(200).json(courses);
    }catch(error){
        res.status(500).json(error);
    }
}

export const newCourse = async (req : Request, res : Response) => {
    try{
        const {title, description, level} = req.body;
        await prisma.courses.create({
            data:{
                title : title,
                description : description,
                level : parseInt(level),
            }
        })
        res.status(200).json({message: `${title} added.`})
    }catch(error){
        res.status(500).json(error);
    }
}

export const deleteCourse = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        await prisma.courses.update({
            where:{
                id: parseInt(id),
            },
            data:{
                enrollments: {
                    deleteMany: {}
                }
            }
        })
        await prisma.courses.delete({
            where: {
                id : parseInt(id),
            }
        })
        res.status(200).json({message : `${id} removed`})
    }catch(error){
        res.status(500).json(error)
    }
}

export const updateCourseInfo = async (req : Request, res : Response) => {
    try{
        const {id}  = req.params
        const {title, description, level, instructorId} = req.body;
        if (title != null){
            await prisma.courses.update({
                where:{
                    id : parseInt(id),
                },
                data:{
                    title : title,
                }
            })
        }
        if (description != null){
            await prisma.courses.update({
                where:{
                    id : parseInt(id),
                },
                data:{
                    description : description,
                }
            })
        }
        if (level != null){
            await prisma.courses.update({
                where:{
                    id : parseInt(id),
                },
                data:{
                    level : parseInt(level),
                }
            })
        }
        if (instructorId != null){
            await prisma.courses.update({
                where:{
                    id: parseInt(id),
                },
                data:{
                    instructor:{
                        connect:{
                            id: parseInt(instructorId),
                        }
                    }
                }
            })
        }
        res.status(200).json({message : `${id} updated`})
    }catch(error){
        res.status(500).json(error);
        console.log(error)
    }
}