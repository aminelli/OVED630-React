import { CreatePostInput, UpdatePostInput } from "@/types";
import { prisma } from '../prisma';
import { PostWithAuthor } from '../../types/index';

export class PostService {

    static async createPost(input: CreatePostInput) {
        return prisma.post.create({ 
            data: {
                title: input.title,
                content: input.content,
                published: input.published ?? false,
                author: {
                    connect: {
                        id: input.authorId
                    }
                },
                tags: input.tags ? {
                    connectOrCreate: input.tags?.map((tag) => ({
                        where: {
                            name: tag
                        },
                        create: {
                            name: tag
                        }
                    }))
                } : undefined
            },
            include : {
                author: {
                    select: {
                        id:true,
                        name: true,
                        email: true
                    }
                },
                tags: true,
                _count: {
                    select: {
                        comments: true
                    }
                }
            } 
        });
    }



     /* id: string
          email: string
          name: string | null
          password: string
          role: $Enums.Role
          createdAt: Date
          updatedAt: Date
          */

    static async getPostById(id: string): Promise<PostWithAuthor | null> {
        return prisma.post.findUnique({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                        password: true
                    }
                },
                tags: true,
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        })
    }


    static async getAllPosts(published: boolean = true) {
        return prisma.post.findMany({
            where: {
                published
            },
            include : {
                author: {
                    select: {
                        id:true,
                        name: true,
                        email: true
                    }
                },
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
        });
    }


    static async updatePost(input: UpdatePostInput) {
        
        const {id, tags, ...updateData} = input;

        return prisma.post.update({
            where: {
                id
            },
            data: {
                ...updateData,
                tags: tags ? {
                    connectOrCreate: tags.map((tag) => ({
                        where: {
                            name: tag
                        },
                        create: {
                            name: tag
                        }
                    }))
                } : undefined
            },
            include : {
                author: {
                    select: {
                        id:true,
                        name: true,
                        email: true
                    }
                },
                tags: true
            }
        });
    }


    static async deletePost(id: string) {
        return prisma.post.delete({
            where: {
                id
            }
        });
    }

    
    static async getPostsByUserId(userId: string) {
        return prisma.post.findMany({
            where: {
                authorId: userId
            },
            include : {
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
        });
    }


}