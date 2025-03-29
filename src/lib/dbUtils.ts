import { Connection, RowDataPacket } from 'mysql2/promise';
import { User } from '../types/user';
import mockUsers from '../../mocks/users.mock.json';

export const tableExists = async (conn: Connection, tableName: string): Promise<boolean> => {
    const [rows] = await conn.execute<RowDataPacket[]>(
        `SHOW TABLES LIKE '${tableName}'`
    );
    return rows.length > 0;
};

export const createUserTable = async (conn: Connection): Promise<void> => {
    await conn.execute(`
        CREATE TABLE USER (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
  `);
    console.log('USER table created.');
};

export const userCount = async (conn: Connection): Promise<number> => {
    const [rows] = await conn.execute<RowDataPacket[]>(
        `SELECT COUNT(*) as count FROM USER`
    );
    return rows[0].count;
};

export const insertDummyUsers = async (conn: Connection): Promise<void> => {
    const inserts = (mockUsers as User[]).map(user =>
      conn.execute(
        `INSERT INTO USER (id, name, email, created_at) VALUES (?, ?, ?, ?)`,
        [user.id, user.name, user.email, user.created_at]
      )
    );
    await Promise.all(inserts);
    console.log(`Inserted ${mockUsers.length} mock users.`);
  };
