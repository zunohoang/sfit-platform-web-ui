import Header from '@/components/Header';
import ActivityPage from '@/components/ActivityPage';

export default function Activity() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ActivityPage />
      </main>
    </div>
  );
}
