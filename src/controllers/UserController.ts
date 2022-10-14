import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {

    static async find(req: Request, res: Response) {
        try {
            console.time("Find Users");

            const users = await prisma.user.findMany();

            console.timeEnd("Find Users");
            return res.json(users);
        } catch (e) {
            console.log(e);
            return res.json({
                error: e
            })
        }
    }

}

export default UserController