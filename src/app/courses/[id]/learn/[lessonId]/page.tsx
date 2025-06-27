import Header from '@/components/Header';
import CourseLearningPage from '@/components/CourseLearningPage';

export default function CourseLearning({ params }: { params: { id: string; lessonId: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <CourseLearningPage courseId={params.id} lessonId={params.lessonId} />
      </main>
    </div>
  );
}
