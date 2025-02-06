import { Request, Response } from "express"
import { prisma } from "@/database/prisma"
import { z } from "zod"


class TeamsController {
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

        const { id } = paramsSchema.parse(request.params)
        const data = bodySchema.parse(request.body)

        const teams = await prisma.teams.update({
            where: { id },
            data
        })

        return response.status(200).json({ message: "Registro atualizado com sucesso.", teams})
    }

    async delete(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const { id } = paramsSchema.parse(request.params)
        await prisma.teams.delete({
            where: { id }
        })
        return response.status(200).json({ message: "Registro removido com sucesso."})
    }
}

export { TeamsController }