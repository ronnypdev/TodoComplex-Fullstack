import { drizzle } from 'drizzle-orm/postgres-js';
import { eq } from 'drizzle-orm';
import { listItemTable } from './schemas/schema';
import postgres from 'postgres';

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  const client = postgres(process.env.DATABASE_URL);
  const db = drizzle(client);

  const todoItem: typeof listItemTable.$inferInsert = {
    updatedItem: 'test item product',
    completed: false,
  };

  await db.insert(listItemTable).values(todoItem);
  console.log('Inserted item');

  const todoItemFromDb = await db.select().from(listItemTable);
  console.log('this is the current item', todoItemFromDb);

  await db
    .update(listItemTable)
    .set({ updatedItem: 'remember to buy milk' })
    .where(eq(listItemTable.id, 1));
  console.log('updated item');

  await db.delete(listItemTable).where(eq(listItemTable.id, 1));
  console.log('deleted item');
}
main();
