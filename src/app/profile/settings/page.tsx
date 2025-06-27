import Header from '@/components/Header';
import SettingsPage from '@/components/SettingsPage';

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <SettingsPage />
      </main>
    </div>
  );
}
