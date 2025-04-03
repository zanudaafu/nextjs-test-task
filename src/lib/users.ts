import { createDbConnection } from './db';
import { User } from '@/types/user';
import { DEFAULT_PAGE_SIZE } from './users.constants';

export const getUsersPage = async (
  page: number,
  pageSize: number
): Promise<{ users: User[]; total: number }> => {
  const pageNumber = (Number.isInteger(page) && page > 0) ? page : 1;
  const pageSizeFixed = !(Number.isInteger(pageSize) || pageSize < 0) ? DEFAULT_PAGE_SIZE : pageSize;
  const offset = (pageNumber - 1) * pageSizeFixed;

  const conn = await createDbConnection();

  try {
    const [users] = await conn.query(`SELECT * FROM USER ORDER BY id LIMIT ${pageSizeFixed} OFFSET ${offset}`);
    const [countRows] = await conn.query('SELECT COUNT(*) as count FROM USER');

    return {
      users: users as User[],
      total: (countRows as any)[0].count as number,
    };
  } finally {
    await conn.end();
  }
};

// TODO add updateUser

// TODO add remove all users