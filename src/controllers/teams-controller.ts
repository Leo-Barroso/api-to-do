import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"


class TeamsController {

    async index(request: Request, response: Response) {
        const teams = await prisma.teams.findMany({})
        return response.json(teams)
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        try {
            const { id } = paramsSchema.parse(request.params)
            const teams = await prisma.teams.findUnique({
                where: {
                    id
                }
            })
            response.json(teams)
        } catch (error) {
            response.json({ message: "ID inválido."})
        }
    }

    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string(),
            description: z.string().optional()
        })
        const { name, description } = bodySchema.parse(request.body)
        const teams = await prisma.teams.create({
            data: {
                name: name,
                description: description
            }
        })
        return response.status(201).json({ message: "Registro criado com sucesso.", teams})
    }

    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodySchema = z.object({
            name: z.string(),
            description: z.string()
        })

        try {
            const { id } = paramsSchema.parse(request.params)
            const data = bodySchema.parse(request.body)

            const teams = await prisma.teams.update({
                where: { id },
                data
            })
            return response.status(200).json({ message: "Registro atualizado com sucesso.", teams})
        } catch (error) {
            return response.status(404).json({ message: "ID não encontrado."})
        }
    }

    async delete(request: Request, response: Response) {

        console.log(request)

        if(!request.params.id) {
            return response.json({ message: "ID é obrigatório."})
        }
        
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        try {
            const { id } = paramsSchema.parse(request.params)
            await prisma.teams.delete({
                where: { id }
            })
            return response.status(200).json({ message: "Registro removido com sucesso."}) 
        } catch (error) {
            return response.status(404).json({ message: "ID não encontrado"})
        }
    }
}

export { TeamsController }