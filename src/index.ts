import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, estudents } from './database'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

app.get('/estudents', (req: Request, res: Response) => {
    res.status(200).send(estudents)
})