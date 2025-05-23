import { createDbConnection } from './db';
import { type User, UserData } from '@/types/user';
import { DEFAULT_PAGE_SIZE, DEFAULT_MAX_BULK_CREATE_USER_SIZE } from './users.constants';
import { validateUserInput } from './validation/userSchema';

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

export const deleteAllUsers = async () => {
  const conn = await createDbConnection();
  await conn.execute('DELETE FROM USER');
  await conn.end();
};

export const deleteUserById = async (id: number) => {
  const conn = await createDbConnection();
  await conn.execute(`DELETE FROM USER WHERE id = ${id}`);
  await conn.end();
};

export const createUser = async (newUserData: UserData): Promise<User> => {
  const conn = await createDbConnection();
  const [result] = await conn.execute(
    'INSERT INTO USER (name, email) VALUES (?, ?)',
    [newUserData.name, newUserData.email]
  );
  const id = (result as any).insertId;
  const [rows] = await conn.execute(`SELECT * FROM USER WHERE id = ${id}`);
  await conn.end();
  return (rows as User[])[0];
};

export const updateUser = async (id: number, user: UserData): Promise<User> => {
  const conn = await createDbConnection();
  // TODO: consider what is better to use as user identifier api.id , or user.id - mb handle mismatch
  await conn.execute(
    'UPDATE USER SET name = ?, email = ? WHERE id = ?',
    [user.name, user.email, id]
  );
  const [rows] = await conn.execute(`SELECT * FROM USER WHERE id = ${id}`);
  await conn.end();
  return (rows as User[])[0];
};


export const bulkCreateUsers = async (rawUsers: any[]): Promise<{ created: number; errors: string[] }> => {
  if (rawUsers.length > DEFAULT_MAX_BULK_CREATE_USER_SIZE) {
    return {
      created: 0,
      errors: [`Too many users: maximum allowed is ${DEFAULT_MAX_BULK_CREATE_USER_SIZE}`],
    };
  }

  const { validUsers, errors }: { validUsers: UserData[], errors: string[] } = rawUsers.reduce(
    (acc, rawUser, i) => {
      const result = validateUserInput(rawUser);
      if (result.valid && result.user) {
        acc.validUsers.push(result.user);
      } else {
        acc.errors.push(`Invalid user at index ${i}: ${result.errors?.join(', ')}`);
      }
      return acc;
    },
    { validUsers: [], errors: [] }
  );

  if (errors.length > 0) {
    return { created: 0, errors };
  }

  const conn = await createDbConnection();
  const values = validUsers.map(u => [u.name, u.email]);
  await conn.query('INSERT INTO USER (name, email) VALUES ?', [values]);
  await conn.end();

  return { created: validUsers.length, errors: [] };
};