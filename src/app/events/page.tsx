import Header from '@/components/Header';
import EventsList from '@/components/EventsList';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <EventsList />
      </main>
    </div>
  );
}
