import UserService from "../services/users"
import { Request, Response } from "express";
import { UserProps } from "../interfaces";


const userService = new UserService();

class UserController {
    async getAll(_req: Request, res: Response) {
        const { code, data } = await userService.getAll();
        return res.status(code).json(data);
    }

    async getById(req: Request, res: Response) {
        const { id } = req.params;
        const { code, data, error } = await userService.getById(Number(id));
        if (error) {
            return res.status(error.code).json({ message: error.message });
        }
        return res.status(code).json(data);
    }
}

export default UserController;