type TodoListItem = {
  itemReveal: boolean;
  itemIndexValue: number
  itemValue: string;
  itemId: string;
  itemName: string;
  todoListItemData: (itemIndex: number, event: React.ChangeEvent<HTMLInputElement>) => void;
  // submitItemData: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function TodoListItem({
  itemReveal,
  itemIndexValue,
  itemValue,
  itemId,
  itemName,
  todoListItemData,
}: TodoListItem) {
  return (
    <>
      {itemReveal ? <input className="p-[6px]"
        type="text"
        value={itemValue}
        id={itemId}
        name={itemName}
        onChange={(e) => todoListItemData(itemIndexValue, e)}
      /> :
          <label className="cursor-pointer text-mid-grey" htmlFor={itemId}>{itemValue}</label>}
    </>
  )
}
