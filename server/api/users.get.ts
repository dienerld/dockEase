import { db } from '~/server/database/client.drizzle';
import { users } from '~/server/database/schemas/user.schema';

export default defineEventHandler(async (event) => {
  const usersDB = await db.select().from(users);

  return {
    users: usersDB,
  };
});
