import Header from '@/components/Header';
import CoursesList from '@/components/CoursesList';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CoursesList />
      </main>
    </div>
  );
}
