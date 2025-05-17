'use server';
import { db } from '@/db';
import { listItemTable } from '@/db/schemas/schema';

export async function addItem(item: string) {
  try {
    if (!item) return;

    const itemAdded = await db.insert(listItemTable).values({
      updatedItem: item,
    });

    return itemAdded;
  } catch (error) {
    // Handle errors (e.g., unique constraint violations)
    console.error('Failed to add user:', error);
    return { error: 'Failed to add user. Please try again.' };
  }
}
