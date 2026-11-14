const cron = require("node-cron");
const prisma = require("../prismaClient");

// Run every minute
cron.schedule("0 0 1 1 *", async () => {
    console.log("Checking expired URLs...", new Date());
    try {
        const currentYear = new Date().getFullYear();

        if (currentYear % 5 === 0) {
            const result = await prisma.url.deleteMany({
                where: {
                    expiresOn: {
                        lte: new Date()
                    }
                }
            });

            if (result.count > 0) {
                console.log(`${result.count} expired URLs deleted`);
            }
        }
    } catch (error) {
        console.error("Error deleting expired URLs:", error);
    }
});
