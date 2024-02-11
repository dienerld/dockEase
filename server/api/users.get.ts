import { db } from '~/server/database/client.drizzle';
import { users } from '~/server/database/schemas/user.schema';

export default defineEventHandler(async (event) => {
  const usersDB = await db.select().from(users);
  const jsonPlace = await $fetch(
    'https://jsonplaceholder.typicode.com/todos/1',
  );

  console.log(jsonPlace);

  return {
    users: usersDB,
    json: jsonPlace,
  };
});
