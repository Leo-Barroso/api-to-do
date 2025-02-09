import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";
import { ensuredAuthenticated } from "@/middlewares/ensured-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.use(ensuredAuthenticated, verifyUserAuthorization(["admin"]))
teamsRoutes.post("/", teamsController.create)
teamsRoutes.put("/:id", teamsController.update)
teamsRoutes.get("/", teamsController.index)
teamsRoutes.get("/:id", teamsController.show)
teamsRoutes.delete("/:id", teamsController.delete)

export { teamsRoutes }