import { Request, Response, NextFunction } from "express";

class UsersController {
    create(request: Request, response: Response) {
        return response.json({ message: "Ok!"})
    }
}

export { UsersController }