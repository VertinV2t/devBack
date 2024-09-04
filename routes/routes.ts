import express from "express";
import { getCourses } from "../controllers/courses";
import { getCoursesById } from "../controllers/courses";
import { newCourse } from "../controllers/courses";
import { getInstructors } from "../controllers/instructors";
import { getInstructorsById } from "../controllers/instructors";
import { newInstructor } from "../controllers/instructors";
import { getStudents } from "../controllers/students";
import { getStudentsById } from "../controllers/students";
import { newStudent } from "../controllers/students";
import { deleteCourse } from "../controllers/courses";
import { deleteInstructor } from "../controllers/instructors";
import { deleteStudent } from "../controllers/students";
import { updateCourseInfo } from "../controllers/courses";
import { updateInstructorInfo } from "../controllers/instructors";
import { updateStudentInfo } from "../controllers/students";
import { getEnrollments } from "../controllers/enrollments";
import { newEnrollment } from "../controllers/enrollments";
import { unEnroll } from "../controllers/enrollments";
import { updateEnrollment } from "../controllers/enrollments";
import { getEnrollmentById } from "../controllers/enrollments";


const router = express.Router();
router.get('/courses', getCourses);
router.get('/courses/:id', getCoursesById)
router.post('/courses', newCourse)
router.get('/instructors', getInstructors);
router.get('/instructors/:id', getInstructorsById);
router.post('/instructors', newInstructor);
router.get('/students', getStudents);
router.get('/students/:id', getStudentsById);
router.post('/students', newStudent);
router.delete('/courses/:id',deleteCourse);
router.delete('/instructors/:id', deleteInstructor);
router.delete('/students/:id', deleteStudent);
router.put('/courses/:id', updateCourseInfo);
router.put('/instructors/:id', updateInstructorInfo)
router.put('/students/:id', updateStudentInfo)
router.get('/enrollments', getEnrollments);
router.get('/enrollments/:id', getEnrollmentById)
router.post('/enrollments', newEnrollment)
router.delete('/enrollments/:id', unEnroll)
router.put('/enrollments/:id', updateEnrollment)


export {router as mainRoutes};