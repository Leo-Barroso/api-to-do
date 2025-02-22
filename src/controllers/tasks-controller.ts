import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { TaskPriority, TaskStatus } from "@prisma/client";

class TasksController {

    async index(request: Request, response: Response) {
        const tasks = await prisma.tasks.findMany()
        response.json(tasks)
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        try {
            const { id } = paramsSchema.parse(request.params)
            const task = await prisma.tasks.findUnique({
                where: {
                    id
                }
            })
            response.json(task)
        } catch (error) {
            response.json({ message: "ID Inválido"})
        }

    }

    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            title: z.string().min(10),
            description: z.string().min(10),
            status: z.nativeEnum(TaskStatus),
            priority: z.nativeEnum(TaskPriority),
            assignedTo: z.string(),
            teamId: z.string()
        })
        try {
            const { title, description, status, priority, assignedTo, teamId } = bodySchema.parse(request.body)
            const task = await prisma.tasks.create({
                data: {
                    title,
                    description,
                    status,
                    priority,
                    assignedTo,
                    teamId
                }
            })
            return response.status(201).json({ message: "Tarefa criada com sucesso.", task})
        } catch (error) {
            return response.status(400).json({ message: "Dados inválidos."})
        }
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const bodySchema = z.object({
            title: z.string().min(10),
            description: z.string().min(10),
            status: z.nativeEnum(TaskStatus),
            priority: z.nativeEnum(TaskPriority),
            assignedTo: z.string(),
            teamId: z.string()
        })
        try {
            const { id } = paramsSchema.parse(request.params)
            const data = bodySchema.parse(request.body)

            const findTask = await prisma.tasks.findUnique({
                where: { id }
            })

            if(!findTask) {
                return response.status(404).json({ message: "ID não encontrado"})        
            }

            if(findTask.status === TaskStatus.completed) {
                return response.status(400).json({ message: "Não é permitido alterar registros com status [completed]"})        
            }

            const task = await prisma.tasks.update({
                where: { id },
                data
            })
            return response.status(200).json({ message: "Registro atualizado com sucesso.", task})
        } catch (error) {
            return response.status(400).json({ message: "Dados inválidos."})        
        }
    }

    async delete(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        try {
            const { id } = paramsSchema.parse(request.params)
            const findTask = await prisma.tasks.findUnique({
                where: { id }
            })

            if(!findTask) {
                return response.status(404).json({ message: "ID não encontrado."})
            }

            if(findTask?.status === TaskStatus.completed) {
                return response.status(400).json({ message: "Não é permitido remover registros com status [completed]" });
            }

            await prisma.tasks.delete({
                where: { id }
            })
            return response.status(200).json({ message: "Registro removido com sucesso."})
        } catch (error) {
            return response.status(400).json({ message: "Dados inválidos."})
        }
    }

}

export { TasksController }