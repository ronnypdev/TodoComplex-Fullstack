import { fetchItems } from '@/lib/utils/actions';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';

export default async function Home() {
  const initialItems = await fetchItems();

  return (
    <main className="h-full flex-col justify-center">
      <Header />
      <div className="max-container relative bottom-32">
        <TodoList initialItems={initialItems} />
      </div>
      <div className="text-center">
        <p className="text-sm leading-normal font-normal not-italic -tracking[0.194px] text-shade-grey">
          Drag and drop to reorder list
        </p>
      </div>
    </main>
  );
}
