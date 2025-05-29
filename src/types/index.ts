export interface TodoItem {
  id: number; // Adjust based on your database ID type
  updatedItem: string;
  completed: boolean;
  reveal: boolean;
  error?: string; // For error handling from the action
  // filterNames?: string[];
}

export interface TodoItemResult {
  id: number;
  created_at: Date | null;
  updatedItem: string;
  completed: boolean | null; // Allow null
  reveal: boolean | null; // Allow null
}

export interface ActionResult<T> {
  data?: T;
  error?: string;
}
