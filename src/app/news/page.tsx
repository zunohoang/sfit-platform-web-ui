import Header from '@/components/Header';
import NewsList from '@/components/NewsList';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <NewsList />
      </main>
    </div>
  );
}
