import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";
import { connect } from "http2";

export const getEnrollments = async (req : Request, res : Response) => {
    try{
        const {studentId, courseId} = req.body;
        var enrollments;
        if (studentId != null){
            enrollments = await prisma.enrollments.findMany({
                where:{
                    studentId: studentId,
                }
            })
        }
        if (courseId != null){
            enrollments = await prisma.enrollments.findMany({
                where:{
                    courseId : courseId
                }
            })
        }
        if (studentId != null && courseId != null){
            enrollments = await prisma.enrollments.findMany({
                where:{
                    courseId : courseId,
                    studentId: studentId
                }
            })
        }
        else {
            enrollments = await prisma.enrollments.findMany({
            })
        }
        res.status(200).json(enrollments);
    }catch(error) {
        res.status(500).json(error)
    }  
}

export const getEnrollmentById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const enrollments = await prisma.enrollments.findUnique({
            where:{
                id: parseInt(id)
            }
        })
        res.status(200).json(enrollments);
    }catch (error){
        res.status(500).json(error)
    }  
}

export const newEnrollment = async (req : Request, res : Response) => {
    try{
        const {studentId, courseId} = req.body;
        const enrollment = await prisma.enrollments.create({data: {enrollmentDate : new Date()}})
        await prisma.students.update({
            where: {
                id: parseInt(studentId),
            },
            data:{
                enrollments:{
                    connect: {
                        id: enrollment.id,
                    }
                }
            }
        })
        await prisma.courses.update({
            where: {
                id: parseInt(courseId),
            },
            data:{
                enrollments:{
                    connect: {
                        id: enrollment.id,
                    }
                }
            }
        })
        res.status(200).json({message: "Enrollment success"})
    }catch(error){
        res.status(500).json(error)
    }
}

export const unEnroll = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        await prisma.enrollments.update({
            where:{
                id: parseInt(id),
            },
            data:{
                student:{
                    disconnect: true,
                },
                course:{
                    disconnect: true,
                }
            }
        })
        await prisma.enrollments.delete({
            where:{
                id: parseInt(id),
            }
        })
        res.status(200).json({message : "unenrolled."})
    }catch(error){
        res.status(500).json(error);
    }
}

export const updateEnrollment = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const {studentId, courseId} = req.body;
        if (studentId != null){
            await prisma.enrollments.update({
                where:{
                    id: parseInt(id),
                },
                data:{
                    student:{
                        disconnect:true
                    },
                }
            })
            await prisma.students.update({
                where:{
                    id: parseInt(studentId),
                },
                data:{
                    enrollments:{
                        connect:{
                            id: parseInt(id),
                        }
                    }
                }
            })
        }
        if (courseId != null){
            await prisma.enrollments.update({
                where:{
                    id: parseInt(id),
                },
                data:{
                    course:{
                        disconnect:true
                    },
                }
            })
            await prisma.courses.update({
                where:{
                    id: parseInt(courseId),
                },
                data:{
                    enrollments:{
                        connect:{
                            id: parseInt(id),
                        }
                    }
                }
            })
        }
        res.status(200).json({message: 'updated'})
    }catch(error){
        res.status(500).json(error)
    }
}