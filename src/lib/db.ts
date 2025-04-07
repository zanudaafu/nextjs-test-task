import mysql, { Connection } from 'mysql2/promise';
import './env';

export const createDbConnection = async (): Promise<Connection> => {
    const config = {
        host: process.env.MYSQL_HOST || '127.0.0.1',
        port: Number(process.env.MYSQL_PORT || 3306),
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    };

    // console.log('[DB] Attempting connection with config:', config);

    return mysql.createConnection(config);
};

