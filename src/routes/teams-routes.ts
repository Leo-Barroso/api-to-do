import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";
import { ensuredAuthenticated } from "@/middlewares/ensured-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsRoutes = Router()
const teamsController = new TeamsController()

teamsRoutes.use(ensuredAuthenticated, verifyUserAuthorization(["admin"]))
teamsRoutes.post("/", teamsController.create)

export { teamsRoutes }