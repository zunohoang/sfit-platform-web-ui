import Header from '@/components/Header';
import CourseDetailPage from '@/components/CourseDetailPage';

export default function CourseDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <CourseDetailPage courseId={params.id} />
      </main>
    </div>
  );
}
