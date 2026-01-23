
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // The paper ID from previous debug was 49daa576-07e5-4a...
    // Let's hardcode it or search for papers with consistencyStatus 'PENDING_VERIFICATION'

    const papers = await prisma.paper.findMany({
        where: { consistencyStatus: 'PENDING_VERIFICATION' },
        select: {
            title: true,
            consistencyLog: true,
            updatedAt: true
        },
        take: 5,
        orderBy: { updatedAt: 'desc' }
    });

    // console.log(JSON.stringify(papers, null, 2));
    const fs = require('fs');
    fs.writeFileSync('logs.json', JSON.stringify(papers, null, 2), 'utf8');
    console.log('Logs dumped to logs.json');
}

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
