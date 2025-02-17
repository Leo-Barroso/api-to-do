import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { ensuredAuthenticated } from "@/middlewares/ensured-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { TasksStatusController } from "@/controllers/tasks-status-controller";

const tasksRoutes = Router()
const tasksController = new TasksController()
const tasksStatusController = new TasksStatusController()

tasksRoutes.use(ensuredAuthenticated, verifyUserAuthorization(["admin"]))
tasksRoutes.get("/", tasksController.index)
tasksRoutes.get("/:id", tasksController.show)
tasksRoutes.post("/", tasksController.create)
tasksRoutes.put("/:id", tasksController.update)
tasksRoutes.patch("/:id/status", tasksStatusController.update)
tasksRoutes.delete("/:id", tasksController.delete)

export { tasksRoutes }