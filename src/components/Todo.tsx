import Header from "./Header";
import TodoList from "./TodoList";

export default function Todo() {
  return (
    <main className="h-full flex-col justify-center">
      <Header />
      <div className="max-container relative bottom-32">
        <TodoList />
      </div>
      <div className="text-center">
        <p className="text-sm leading-normal font-normal not-italic -tracking[0.194px] text-shade-grey">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  )
}
