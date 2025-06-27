import Header from '@/components/Header';
import TasksList from '@/components/TasksList';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <TasksList />
      </main>
    </div>
  );
}
