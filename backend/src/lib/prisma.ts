import { PrismaClient } from '@prisma/client';

// Use global singleton to prevent multiple instances during hot reload
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Test connection without crashing - just log
prisma.$connect()
    .then(() => {
        console.log('✅ Database connected successfully');
    })
    .catch((error: unknown) => {
        console.error('❌ Database connection failed:', error);
        // DO NOT exit - let the server start and handle errors gracefully
        // process.exit(1);
    });

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('🔌 Database disconnected');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    console.log('🔌 Database disconnected');
    process.exit(0);
});

export default prisma;

