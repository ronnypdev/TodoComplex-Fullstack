'use server';
import { db } from '@/db';
import { listItemTable } from '@/db/schemas/schema';
import { TodoItemResult } from '@/types';
import { eq } from 'drizzle-orm';

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
      completed: item.completed ?? false,
      reveal: item.reveal ?? false,
    }));
  } catch (error) {
    console.error('Failed to fetch items:', error);
    throw new Error('Failed to fetch items from database');
  }
}

// Update the item
export async function updateItem(
  itemId: number,
  updatedItem: string
): Promise<TodoItemResult | { error: string }> {
  try {
    const updatedItemData = await db
      .update(listItemTable)
      .set({ updatedItem })
      .where(eq(listItemTable.id, itemId))
      .returning({
        id: listItemTable.id,
        updatedItem: listItemTable.updatedItem,
        completed: listItemTable.completed,
        reveal: listItemTable.reveal,
        created_at: listItemTable.created_at,
      });
    return {
      id: updatedItemData[0].id,
      updatedItem: updatedItemData[0].updatedItem,
      completed: updatedItemData[0].completed,
      reveal: updatedItemData[0].reveal,
      created_at: updatedItemData[0].created_at,
    };
  } catch (error) {
    // Handle errors (e.g., unique constraint violations)
    console.error('Failed to add user:', error);
    return { error: 'Failed to add user. Please try again.' };
  }
}

// A function to delete an item from the database by its ID and return the updated list of items after deletion. This function is used in the removeTodoItem function in TodoList.tsx. It takes the itemId as a parameter and returns a Promise that resolves to an array of TodoItemResult objects. If the deletion is successful, it returns the updated list of items. If there's an error, it logs the error and returns an empty array.
