
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const paper = await prisma.paper.findFirst({
        where: {
            // Get the one updated most recently
            consistencyStatus: 'CHECK_ERROR'
        },
        orderBy: { updatedAt: 'desc' },
        select: {
            id: true,
            title: true,
            consistencyStatus: true,
            consistencyLog: true,
            updatedAt: true
        }
    });

    if (paper) {
        console.log('--- LATEST ERROR PAPER ---');
        console.log(JSON.stringify(paper, null, 2));
        fs.writeFileSync('latest_error_log.json', JSON.stringify(paper, null, 2));
    } else {
        console.log('No paper with CHECK_ERROR found.');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
