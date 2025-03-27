'use client'

import { useState } from "react";
import { nanoid } from 'nanoid';

import CrossIcon from "./icons/CrossIcon";
import OvalIcon from "./icons/OvalIcon";
import PencilIcon from "./icons/PencilIcon";

import TodoListItem from "./TodoListItem";

type TodoList = {
  id: string;
  listItem: string;
  completed: boolean;
  reveal: boolean;
  filterNames: string[];
}

export default function TodoList() {
  const [todoLisItem, setTodoListItem] = useState<string>("");
  const [addListItems, setAddListItems] = useState<TodoList[]>([]);
  const [isActiveIndex, setIsActiveIndex] = useState<null | number>(null);
  const [filter, setFilter] = useState<string>("All");
  const [itemChecked, setItemChecked] = useState<boolean>(true);

  function handleTodoItemChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoListItem(event.target.value);
  }

  function addTodoItem() {
    setAddListItems([
      ...addListItems,
      {
        id: nanoid(),
        listItem: todoLisItem,
        completed: false,
        reveal: false,
        filterNames: ["All", "Active", "Completed"],
      }
    ])
    setTodoListItem("");
  }

  function removeTodoItem(index: number) {
    setAddListItems(prevAddListItems =>
      prevAddListItems.filter(item =>
        item.id !== addListItems[index].id
      )
    );
  }

  function editTodoItem(itemId: string) {
    setAddListItems(prevAddListItems =>
      prevAddListItems.map(item =>
        item.id === itemId ? { ...item, reveal: !item.reveal } : item
      )
    );
  }

  function updateTodoItem(itemIndex: number, event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setAddListItems(prevAddListItems =>
      prevAddListItems.map(item =>
        item.id === addListItems[itemIndex].id ? {...item, listItem: value} : item
      )
    )
  }

  function checkCompleteItem(itemId: string, event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    setAddListItems((prevAddListItems) =>
      prevAddListItems.map(item =>
        item.id === itemId ? {...item, completed: isChecked} : item
      )
    );
  }

  function toggleActive(index: number, filterOption: string) {
    setIsActiveIndex(index);
    setFilter(filterOption);
  }

  function uncheckItems() {
    setItemChecked(false)
  }

  function submitTodoData(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addTodoItem();
  }

  return (
    <>
      <form className="w-[540px] h-[540px] my-0 mx-auto" onSubmit={submitTodoData}>
        <label htmlFor="listInput" className="relative mb-8 block">
          <OvalIcon />
          <input
            className="w-full max-w-full py-[23px] pr-5 pl-[47px] shadow-paleWhite rounded-[5px] placeholder:text-dark-grey"
            type="text"
            onChange={handleTodoItemChange}
            value={todoLisItem}
            name="listInput"
            id="listInput"
            placeholder="Create a new todo item..."
          />
        </label>
        <div className="w-full h-full max-w-full bg-white rounded-[5px] shadow-paleWhite">
          <div className="h-[85%] overflow-y-auto min-h-[auto]">
            {addListItems.map((item, index) => (
              <>
                {filter === "All" && (
                  <div key={item.id}
                    className={`p-6 ${index === 0 ? "border-t first:border-0" : "border-t border-t-lightGrey"}
                    flex justify-between items-center group/controls`}
                  >
                    <div className="todo-flex-col">
                      <input className="cursor-pointer checkbox-round relative right-[11px] bottom-[2px]"
                        type="checkbox"
                        id={item.id}
                        checked={item.completed}
                        name={item.id}
                        onChange={(event) => {
                          checkCompleteItem(item.id, event);
                          setItemChecked(!itemChecked)
                        }}
                      />
                      <TodoListItem
                        itemReveal={item.reveal}
                        itemIndexValue={index}
                        itemValue={item.listItem}
                        itemId={item.id}
                        itemName={item.id}
                        todoListItemData={updateTodoItem}
                      />
                    </div>
                    <div className="hidden group-hover/controls:flex group-hover/controls:justify-center group-hover/controls:items-center">
                      {!item.completed && <PencilIcon
                        fillColor="#494C6B"
                        toggleOnClick={() => editTodoItem(item.id)}
                        hoverState="hover:fill-midGrey cursor-pointer mr-2" />}
                      <CrossIcon
                        fillColor="#494C6B"
                        toggleOnClick={() => removeTodoItem(index)}
                        hoverState="hover:fill-midGrey cursor-pointer mr-2" />
                    </div>
                  </div>)
                }
                {filter === "Active" && !item.completed && (
                  <div key={item.id}
                    className={`p-6 ${index === 0 ? "border-t first:border-0" : "border-t border-t-lightGrey"}
                    flex justify-between items-center group/controls`}
                  >
                    <div className="todo-flex-col">
                      <input className="cursor-pointer checkbox-round relative right-[11px] bottom-[2px]"
                        type="checkbox"
                        id={item.id}
                        checked={item.completed}
                        name={item.id}
                        onChange={(event) => checkCompleteItem(item.id, event)}
                      />
                      <TodoListItem
                        itemReveal={item.reveal}
                        itemIndexValue={index}
                        itemValue={item.listItem}
                        itemId={item.id}
                        itemName={item.id}
                        todoListItemData={updateTodoItem}
                      />
                    </div>
                    <div className="hidden group-hover/controls:flex group-hover/controls:justify-center group-hover/controls:items-center">
                      {!item.completed && <PencilIcon
                        fillColor="#494C6B"
                        toggleOnClick={() => editTodoItem(item.id)}
                        hoverState="hover:fill-midGrey cursor-pointer mr-2" />}
                      <CrossIcon
                        fillColor="#494C6B"
                        toggleOnClick={() => removeTodoItem(index)}
                        hoverState="hover:fill-midGrey cursor-pointer mr-2" />
                    </div>
                  </div>)
                }
                {filter === "Completed" && item.completed && (
                  <div key={item.id}
                    className={`p-6 ${index === 0 ? "border-t first:border-0" : "border-t border-t-lightGrey"}
                    flex justify-between items-center group/controls`}
                  >
                    <div className="todo-flex-col">
                      <input className="cursor-pointer checkbox-round relative right-[11px] bottom-[2px]"
                        type="checkbox"
                        id={item.id}
                        checked={item.completed}
                        name={item.id}
                        onChange={(event) => checkCompleteItem(item.id, event)}
                      />
                      <TodoListItem
                        itemReveal={item.reveal}
                        itemIndexValue={index}
                        itemValue={item.listItem}
                        itemId={item.id}
                        itemName={item.id}
                        todoListItemData={updateTodoItem}
                      />
                    </div>
                    <div className="hidden group-hover/controls:flex group-hover/controls:justify-center group-hover/controls:items-center">
                      {!item.completed && <PencilIcon
                        fillColor="#494C6B"
                        toggleOnClick={() => editTodoItem(item.id)}
                        hoverState="hover:fill-midGrey cursor-pointer mr-2" />}
                      <CrossIcon
                        fillColor="#494C6B"
                        toggleOnClick={() => removeTodoItem(index)}
                        hoverState="hover:fill-midGrey cursor-pointer mr-2" />
                    </div>
                  </div>)
                }
              </>
            ))}
          </div>

          <div className="controls border-t border-t-lightGrey h-[15%] flex justify-between items-center px-[14px]">
            <p className="text-shadeGrey"><span>{addListItems.length}</span> items left</p>
              <ul className="flex justify-between items-center">
                {addListItems.length > 0 && addListItems[0].filterNames ? (
                  addListItems[0].filterNames.map((filterItem, index) => (
                    <li
                      key={index}
                      className={`ml-4 cursor-pointer text-primaryBlue ${index === isActiveIndex ? "text-primaryBlue" : "text-shadeGrey"}`}
                      onClick={() => toggleActive(index, filterItem)}
                    >{filterItem}</li>
                  ))
                ) : (
                  <>
                    <li className="ml-4 cursor-pointer text-primaryBlue">All</li>
                    <li className="ml-4 cursor-pointer text-shadeGrey">Active</li>
                    <li className="ml-4 cursor-pointer text-shadeGrey">Completed</li>
                  </>
                )}
              </ul>
            <p className="text-shadeGrey cursor-pointer" onClick={() => uncheckItems()}>Clear Completed</p>
          </div>
        </div>
      </form>
    </>
  )
}
