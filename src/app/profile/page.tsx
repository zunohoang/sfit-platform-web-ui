import Header from '@/components/Header';
import ProfilePage from '@/components/ProfilePage';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProfilePage />
      </main>
    </div>
  );
}
