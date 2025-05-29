'use server';
import { db } from '@/db';
import { listItemTable } from '@/db/schemas/schema';
import { TodoItemResult } from '@/types';

export async function addItem(
  item: string
): Promise<TodoItemResult | { error: string }> {
  try {
    if (!item) return { error: 'Item cannot be empty' };

    const itemAdded = await db
      .insert(listItemTable)
      .values({
        updatedItem: item,
      })
      .returning({
        id: listItemTable.id,
        created_at: listItemTable.created_at,
      });

    return {
      id: itemAdded[0].id,
      updatedItem: item,
      completed: false,
      reveal: false,
      created_at: itemAdded[0].created_at,
    };
  } catch (error) {
    // Handle errors (e.g., unique constraint violations)
    console.error('Failed to add user:', error);
    return { error: 'Failed to add user. Please try again.' };
  }
}

export async function fetchItems(): Promise<TodoItemResult[]> {
  try {
    const items = await db.select().from(listItemTable);

    return items.map((item) => ({
      ...item,
      completed: item.completed || false,
      reveal: item.reveal || false,
    }));
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw new Error('Failed to fetch items from database');
  }
}
