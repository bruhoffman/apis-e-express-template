import express, { Request, Response} from "express";
import cors from "cors";
import { courses, students } from "./database";
import { TCourse } from "./types";

const app = express ();

app.use(express.json());
app.use(cors());

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003");
})

app.get("/ping", (req:Request, res:Response) => {
    res.send("Pong!")
})

app.get("/courses", (req: Request, res: Response) => {
    res.status(200).send(courses)
})

app.get("/courses/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = courses.filter((course) => {
        return course.name.toLowerCase().includes(q.toLowerCase())
    })

    console.log(result)

    res.status(200).send(result)
})

app.post("/courses", (req: Request, res: Response) => {

    console.log(req.body)

    const { id, name, lessons, stack } = req.body
    const newCourse: TCourse = {id, name, lessons, stack}
    
    courses.push(newCourse)

    res.status(201).send("Curso cadastrado com sucesso!")
})

app.get("/students", (req: Request, res: Response) => {
    res.send(students)
})

app.get("/students/search", (req: Request, res: Response) => {
    const q = req.query.q as string;

    const result = students.filter((student) => {
        return student.name.toLowerCase().includes(q.toLowerCase())
    })

    res.status(200).send(result)
})

app.post("/students", (req: Request, res: Response) => {
    const { id, name, age} = req.body;

    const newStudent = {id, name, age};
    students.push(newStudent)

    res.status(201).send("Estudante cadastrado com sucesso!")
})