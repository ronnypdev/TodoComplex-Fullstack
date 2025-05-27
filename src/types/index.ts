export interface TodoItem {
  id: string | number; // Adjust based on your database ID type
  listItem: string;
  completed: boolean;
  reveal: boolean;
  error?: string; // For error handling from the action
}

export interface TodoItemResult extends TodoItem {
  error?: string; // For error handling from the action
}

export interface ActionResult<T> {
  data?: T;
  error?: string;
}
