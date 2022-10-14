import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { readdirSync } from 'fs';
import redis from '../lib/cache';

const prisma = new PrismaClient();

class UserController {

    static async find(req: Request, res: Response) {
        try {

            const cacheKey = "users:all";

            const cachedUsers = await redis.get(cacheKey);

            console.time("Find Users");

            if(cachedUsers) {
                console.timeEnd("Find Users");
                return res.json(JSON.parse(cachedUsers));
            }

            const users = await prisma.user.findMany();
            console.timeEnd("Find Users");

            await redis.set(cacheKey, JSON.stringify(users));
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