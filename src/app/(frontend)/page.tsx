import { fetchItems } from '@/lib/utils/actions';
import Header from '@/components/Header';
import TodoList from '@/components/TodoList';

export default async function Home() {
  const initialItems = await fetchItems();

  return (
    <main className="h-full flex-col justify-center">
      <Header />
      <div className="max-container relative bottom-[170px] md:bottom-32">
        <TodoList initialItems={initialItems} />
      </div>
    </main>
  );
}
