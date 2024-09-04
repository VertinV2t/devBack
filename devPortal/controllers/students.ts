import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

export const getStudents = async (req : Request, res : Response) => {
    try{
        const courses = await prisma.students.findMany({
            include:{
                enrollments : true,
            }
        })
        res.status(200).json(courses);
    }catch(error) {
        res.status(500).json(error)
    }  
}

export const getStudentsById = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const courses = await prisma.students.findUnique({
            where:{
                id : parseInt(id),
            },
            include:{
                enrollments : true,
            }
        })
        res.status(200).json(courses);
    }catch(error){
        res.status(500).json(error);
    }
}

export const newStudent = async (req : Request, res : Response) => {
    try{
        const {firstName, lastName, email} = req.body;
        await prisma.students.create({
            data:{
                firstName : firstName,
                lastName : lastName,
                email : email,
            }
        })
        res.status(200).json({message: `${firstName} ${lastName} added.`})
    }catch(error){
        res.status(500).json(error);
    }
}

export const deleteStudent = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        await prisma.students.update({
            where:{
                id: parseInt(id),
            },
            data:{
                enrollments: {
                    deleteMany: {}
                }
            }
        })
        await prisma.students.delete({
            where: {
                id : parseInt(id),
            }
        })
        res.status(200).json({message : `${id} removed`})
    }catch(error){
        res.status(500).json(error)
    }
}

export const updateStudentInfo = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const {firstName, lastName, email} = req.body;
        if (firstName != null){
            await prisma.students.update({
                where:{
                    id : parseInt(id),
                },
                data:{
                    firstName : firstName,
                }
            })
        }
        if (lastName != null){
            await prisma.students.update({
                where:{
                    id : parseInt(id),
                },
                data:{
                    lastName : lastName,
                }
            })
        }
        if (email != null){
            await prisma.students.update({
                where:{
                    id : parseInt(id),
                },
                data:{
                    email : email,
                }
            })
        }
        res.status(200).json({message : `${id} updated`})
    }catch(error){
        res.status(500).json(error)
    }
}