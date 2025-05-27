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
      .returning({ id: listItemTable.id });

    return {
      id: itemAdded[0].id,
      listItem: item,
      completed: false,
      reveal: false,
    };
  } catch (error) {
    // Handle errors (e.g., unique constraint violations)
    console.error('Failed to add user:', error);
    return { error: 'Failed to add user. Please try again.' };
  }
}
