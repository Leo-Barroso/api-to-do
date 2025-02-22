import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod"
import { TaskStatus } from "@prisma/client";

class TasksStatusController {
    async update(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })
        const bodySchema = z.object({
            status: z.nativeEnum(TaskStatus)
        })
        const { id } = paramsSchema.parse(request.params)
        const { status } = bodySchema.parse(request.body)

        await prisma.tasks.update({
            data: {
                status
            },
            where: {
                id
            }
        })
        return response.json("Teste")
    }
}
export { TasksStatusController }