'use client';

import { useState } from 'react';

import CrossIcon from './icons/CrossIcon';
import OvalIcon from './icons/OvalIcon';
import PencilIcon from './icons/PencilIcon';

import TodoListItem from './TodoListItem';
import { TodoItem, TodoListProps } from '@/types';
import { addItem } from '@/lib/utils/actions';

export default function TodoList({ initialItems }: TodoListProps) {
  const [todoLisItem, setTodoListItem] = useState<string>('');
  const [listItems, setListItems] = useState<TodoItem[]>(initialItems);
  const [itemChecked, setItemChecked] = useState<boolean>(true);

  function handleTodoItemChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoListItem(event.target.value);
  }

  async function addTodoItem() {
    try {
      const addedItem = await addItem(todoLisItem);

      // Handle potential errors from the action
      if (addedItem && !addedItem.error) {
        setListItems([...listItems, addedItem as TodoItem]);
        setTodoListItem('');
      } else {
        // Handle error case
        console.error('Failed to add item:', addedItem?.error);
      }
    } catch (error) {
      console.error('Failed to add item:', error);
      return { error: 'Failed to add list item. Please try again.' };
    }
  }

  function removeTodoItem(index: number) {
    setListItems((prevListItems) =>
      prevListItems.filter((item) => item.id !== listItems[index].id)
    );
  }

  function editTodoItem(itemId: number) {
    setListItems((prevListItems) =>
      prevListItems.map((item) =>
        item.id === itemId ? { ...item, reveal: !item.reveal } : item
      )
    );
  }

  function updateTodoItem(
    itemIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = event.target;
    setListItems((prevListItems) =>
      prevListItems.map((item) =>
        item.id === listItems[itemIndex].id
          ? { ...item, listItem: value }
          : item
      )
    );
  }

  function checkCompleteItem(
    itemId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const isChecked = event.target.checked;
    setListItems((prevListItems) =>
      prevListItems.map((item) =>
        item.id === itemId ? { ...item, completed: isChecked } : item
      )
    );
  }

  function submitTodoData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (todoLisItem.trim() === '') return;
    addTodoItem();
  }

  function clearCompletedItems() {
    setListItems((prevListItems) =>
      prevListItems.filter((item) => !item.completed)
    );
  }

  return (
    <>
      <form className="w-[540px] h-[540px] m-auto" onSubmit={submitTodoData}>
        <label htmlFor="listInput" className="relative mb-8 block">
          <OvalIcon />
          <input
            className="w-full max-w-full py-[23px] pr-5 pl-[47px] bg-white shadow-(--light-box-shadow) rounded-[5px] placeholder:text-shade-grey"
            type="text"
            onChange={handleTodoItemChange}
            value={todoLisItem}
            name="listInput"
            id="listInput"
            placeholder="Create a new todo item..."
          />
        </label>
        <div className="w-full h-full max-w-full bg-white rounded-[5px] shadow-(--light-box-shadow)">
          <div className="h-[85%] overflow-y-auto min-h-[auto]">
            {listItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-6 ${
                  index === 0
                    ? 'border-t first:border-0'
                    : 'border-t border-t-light-grey'
                }
                    flex justify-between items-center group/controls`}>
                <div className="todo-flex-col">
                  <input
                    className="cursor-pointer checkbox-round relative right-[11px] bottom-[2px]"
                    type="checkbox"
                    id={item.id.toString()}
                    checked={item.completed || false}
                    name={item.updatedItem}
                    onChange={(event) => {
                      checkCompleteItem(item.id, event);
                      setItemChecked(!itemChecked);
                    }}
                  />
                  <TodoListItem
                    itemReveal={item.reveal || false}
                    itemIndexValue={index}
                    itemValue={item.updatedItem}
                    itemId={item.id}
                    itemName={item.updatedItem}
                    todoListItemData={updateTodoItem}
                  />
                </div>
                <div className="hidden group-hover/controls:flex group-hover/controls:justify-center group-hover/controls:items-center">
                  {!item.completed && (
                    <PencilIcon
                      fillColor="#494C6B"
                      toggleOnClick={() => editTodoItem(item.id)}
                      hoverState="hover:fill-midGrey cursor-pointer mr-2"
                    />
                  )}
                  <CrossIcon
                    fillColor="#494C6B"
                    toggleOnClick={() => removeTodoItem(index)}
                    hoverState="hover:fill-midGrey cursor-pointer mr-2"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="controls border-t border-t-light-grey h-[15%] flex justify-between items-center px-[14px]">
            <p className="text-shade-grey">
              <span>{listItems.filter((item) => !item.completed).length}</span>{' '}
              items left
            </p>
            <ul className="flex justify-between items-center">
              {listItems.length > 0 && (
                <>
                  <li className="ml-4 cursor-pointer text-primary-blue">All</li>
                  <li className="ml-4 cursor-pointer text-shade-grey">
                    Active
                  </li>
                  <li className="ml-4 cursor-pointer text-shade-grey">
                    Completed
                  </li>
                </>
              )}
            </ul>
            <p
              className="text-shade-grey cursor-pointer"
              onClick={() => clearCompletedItems()}>
              Clear Completed
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
