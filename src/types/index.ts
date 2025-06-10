export interface TodoItem {
  id: number;
  created_at: Date | null;
  updatedItem: string;
  completed: boolean | null; // Allow null
  reveal: boolean | null; // Allow null
  error?: string;
}

export type TodoItemResult = TodoItem;

export interface ActionResult<T> {
  data?: T;
  error?: string;
}

export interface TodoListProps {
  initialItems: TodoItem[];
  toggleDarkMode: boolean;
}

export type FilterType = 'all' | 'active' | 'completed';

// create a type for the props of the Header component that includes the toggleDarkMode prop and the toggleDarkMode click handler event function prop

export type HeaderProps = {
  toggleDarkMode: boolean;
  toggleDarkModeClickHandler: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
};
