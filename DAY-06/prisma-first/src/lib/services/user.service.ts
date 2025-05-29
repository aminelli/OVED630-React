import { CreateUserInput } from "@/types";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

export class UserService {
    
    static async validatePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);

    }

    static async createUser(input: CreateUserInput) {
     
        const hashedPassword = await bcrypt.hash(input.password, 12);

        return prisma.user.create({
            data: {
                ...input,
                password: hashedPassword
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true
            }
        });
    }

    static async getUserById(id: string) {
        return prisma.user.findUnique({
            where: {
                id
            },
            include : {
                posts: {
                    include: {
                        tags: true,
                        _count: {
                            select: {
                                comments: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });
    }

    static async getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    }


    static async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                _count: {
                    select: {
                        posts: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }



}