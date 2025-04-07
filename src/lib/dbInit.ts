import { createDbConnection } from './db';
import { Connection } from 'mysql2/promise';
import { tableExists, createUserTable, userCount, insertDummyUsers } from './dbUtils';
import "./env";

const initDb = async () => {
    let db: Connection;
    try {
        db = await createDbConnection();
        await db.ping();
    } catch (err) {
        console.error('DB Connection failed:', err);
        process.exit(1);
    }

    const userTableExists = await tableExists(db, 'USER');
    if (!userTableExists) {
        await createUserTable(db);
    }

    const countUsers = await userCount(db);
    if (countUsers === 0) {
        await insertDummyUsers(db);
    }

    await db.end();
};

process.env.DEV_POPULATE_DB_ON_START_IF_EMPTY && initDb();
