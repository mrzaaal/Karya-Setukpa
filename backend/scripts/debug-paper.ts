
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    // ID from OCR of screenshot
    const id = '49daa576-07e5-4fae-a4a5-f5f8a4f46765';

    console.log(`Fetching Paper ID: ${id}...`);

    const paper = await prisma.paper.findUnique({
        where: { id: id }
    });

    if (!paper) {
        console.log('Paper NOT FOUND!');
        return;
    }

    console.log('--- Paper Basic Info ---');
    console.log(`Title: ${paper.title}`);
    console.log(`Content Field (Legacy): "${paper.content}"`);
    console.log(`Structure Type: ${typeof paper.structure}`);

    let structure = paper.structure;
    if (typeof structure === 'string') {
        try {
            structure = JSON.parse(structure);
            console.log('Structure was String, Parsed as JSON.');
        } catch (e) {
            console.log('Structure is String but FAILED to parse JSON.');
        }
    }

    console.log('--- Structure Dump ---');
    // console.log(JSON.stringify(structure, null, 2));

    fs.writeFileSync('debug_structure.json', JSON.stringify(structure, null, 2), 'utf8');
    console.log('Structure dumped to debug_structure.json');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
