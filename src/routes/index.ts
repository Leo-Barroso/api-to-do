import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRouter } from "./sessions-routes";
import { teamsRoutes } from "./teams-routes";

const routes = Router()
routes.use("/users", usersRoutes)
routes.use("/sessions", sessionsRouter)
routes.use("/teams", teamsRoutes)

export { routes }