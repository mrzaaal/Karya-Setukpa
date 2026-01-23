
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Adjusting Integrity Tolerance...');

    const settings = await prisma.systemSetting.findFirst();

    if (settings) {
        console.log(`Current Tolerance: ${settings.integrityTolerance}%`);

        const updated = await prisma.systemSetting.update({
            where: { id: settings.id },
            data: {
                integrityTolerance: 20.0 // Allow up to 20% difference (80% score needed)
            }
        });

        console.log(`New Tolerance: ${updated.integrityTolerance}%`);
        console.log('System verification threshold is now 80%.');
    } else {
        console.log('No settings found to update.');
    }
}

main()
    .catch(console.error)
    .finally(async () => await prisma.$disconnect());
