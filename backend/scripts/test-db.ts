import prisma from '../src/lib/db';

async function main() {
    console.log('Testing Database Connection...');

    // Create or Update dummy user
    const user = await prisma.user.upsert({
        where: { phone: '13800138000' },
        update: {},
        create: {
            phone: '13800138000',
            password: 'test_password',
            role: 'parent'
        }
    });

    console.log('User synced:', user);

    // Check homework count
    const count = await prisma.homework.count();
    console.log('Total Homeworks:', count);

    console.log('Database Test Passed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
