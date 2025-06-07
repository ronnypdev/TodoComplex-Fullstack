type TodoListItem = {
  itemReveal: boolean;
  itemValue: string;
  itemId: number;
  itemName: string;
  todoListItemData: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress: (itemId: number) => void;
  onEscapePress: () => void;
  isEditing: boolean;
  editingValue: string;
};

export default function TodoListItem({
  itemReveal,
  itemValue,
  itemId,
  itemName,
  todoListItemData,
  onEnterPress,
  onEscapePress,
  isEditing,
  editingValue,
}: TodoListItem) {
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onEnterPress(itemId);
    } else if (event.key === 'Escape') {
      onEscapePress();
    }
  }

  return (
    <>
      {itemReveal ? (
        <input
          className="p-[6px]"
          type="text"
          value={isEditing ? editingValue : itemValue}
          id={itemId.toString()}
          name={itemName}
          onChange={todoListItemData}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <label
          className="cursor-pointer text-mid-grey"
          htmlFor={itemId.toString()}>
          {itemValue}
        </label>
      )}
    </>
  );
}
