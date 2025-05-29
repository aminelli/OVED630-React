import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { title } from 'process';

const prisma = new PrismaClient();


async function main() {

    const hashedPassword = await bcrypt.hash('pwd123456', 12);

    const user1 = await prisma.user.create({
        data: {
            name: 'John Doe', 
            email: 'i4y0Y@example.com', 
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'tony Minels', 
            email: 'tm@example.com', 
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

     const user3 = await prisma.user.create({
        data: {
            name: 'tony Manero', 
            email: 'tmma@example.com', 
            password: hashedPassword,
            role: 'USER'
        }
    });

    await prisma.post.create({
        data: {
            title: 'My first post', 
            content: 'This is my first post', 
            published: true,
            authorId: user1.id,
            tags: {
                create: [
                    {name: 'prisma'},
                    {name: 'react'},
                    {name: 'programming'}
                ]
                    
            }
        }
    })


    console.log("Database poppolato con successo")
    
}


main()
.catch(e => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});