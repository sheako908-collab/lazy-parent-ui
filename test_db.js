import pg from 'pg';
const { Client } = pg;

// Trying with Brackets included
const connectionString = "postgresql://postgres:[86611346fukaI]@db.gvryqxqmjwvtdwxmxbpl.supabase.co:5432/postgres";

const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function test() {
    try {
        console.log('Connecting to Supabase (Brackets test)...');
        await client.connect();
        console.log('Connected successfully!');
        const res = await client.query('SELECT NOW()');
        console.log('Current time from DB:', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
}

test();
