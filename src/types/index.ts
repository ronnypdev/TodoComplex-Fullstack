export interface TodoItem {
  id: number;
  created_at: Date | null;
  updatedItem: string;
  completed: boolean | null; // Allow null
  reveal: boolean | null; // Allow null
  error?: string;
  // filterNames?: string[];
}

export type TodoItemResult = TodoItem;

export interface ActionResult<T> {
  data?: T;
  error?: string;
}
