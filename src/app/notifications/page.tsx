import Header from '@/components/Header';
import NotificationsList from '@/components/NotificationsList';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <NotificationsList />
      </main>
    </div>
  );
}
