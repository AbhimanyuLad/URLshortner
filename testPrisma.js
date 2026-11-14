const prisma = require("./prismaClient");

async function test() {
    try {
        const result = await prisma.url.findMany();

        console.log(result);
    } catch (error) {
        console.log(error);
    } finally {
        await prisma.$disconnect();
    }
}

test();
