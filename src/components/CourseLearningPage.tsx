'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookOpenIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ClockIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
  Cog6ToothIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface CourseData {
  id: string;
  title: string;
  modules: Module[];
  currentLesson: Lesson;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  isExpanded: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  isCompleted: boolean;
  videoUrl?: string;
  content?: string;
  quiz?: Quiz;
}

interface Quiz {
  questions: Question[];
  currentQuestion: number;
  userAnswers: number[];
  isSubmitted: boolean;
  score?: number;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const mockCourseData: CourseData = {
  id: '1',
  title: 'React.js từ cơ bản đến nâng cao',
  currentLesson: {
    id: '1',
    title: 'React là gì? - Giới thiệu tổng quan',
    duration: '15 phút',
    type: 'video',
    isCompleted: false,
    videoUrl: '/api/placeholder/video',
    content: `
      <h2>React là gì?</h2>
      <p>React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook để xây dựng giao diện người dùng, đặc biệt là cho các ứng dụng web đơn trang (SPA).</p>
      
      <h3>Đặc điểm chính của React:</h3>
      <ul>
        <li><strong>Component-based:</strong> React sử dụng kiến trúc dựa trên component, cho phép bạn chia nhỏ UI thành các phần độc lập và có thể tái sử dụng.</li>
        <li><strong>Virtual DOM:</strong> React sử dụng Virtual DOM để tối ưu hóa hiệu suất bằng cách chỉ cập nhật những phần thay đổi thực sự.</li>
        <li><strong>Declarative:</strong> React cho phép bạn mô tả UI như thế nào chứ không phải làm thế nào để tạo ra nó.</li>
        <li><strong>Unidirectional Data Flow:</strong> Dữ liệu trong React chảy theo một hướng, từ parent component xuống child component.</li>
      </ul>

      <h3>Tại sao nên học React?</h3>
      <p>React là một trong những thư viện frontend phổ biến nhất hiện tại với:</p>
      <ul>
        <li>Cộng đồng lớn và tài liệu phong phú</li>
        <li>Được sử dụng bởi nhiều công ty lớn như Facebook, Netflix, Airbnb</li>
        <li>Có nhiều công cụ và thư viện hỗ trợ</li>
        <li>Khả năng tái sử dụng code cao</li>
      </ul>
    `
  },
  modules: [
    {
      id: '1',
      title: 'Giới thiệu về React',
      isExpanded: true,
      lessons: [
        {
          id: '1',
          title: 'React là gì?',
          duration: '15 phút',
          type: 'video',
          isCompleted: false
        },
        {
          id: '2',
          title: 'Cài đặt môi trường',
          duration: '20 phút',
          type: 'video',
          isCompleted: false
        },
        {
          id: '3',
          title: 'JSX và Components',
          duration: '25 phút',
          type: 'video',
          isCompleted: false
        },
        {
          id: '4',
          title: 'Bài đọc: Lịch sử React',
          duration: '10 phút',
          type: 'reading',
          isCompleted: false
        },
        {
          id: '5',
          title: 'Quiz: Kiểm tra kiến thức cơ bản',
          duration: '5 phút',
          type: 'quiz',
          isCompleted: false,
          quiz: {
            questions: [
              {
                id: '1',
                question: 'React được phát triển bởi công ty nào?',
                options: ['Google', 'Facebook', 'Microsoft', 'Apple'],
                correctAnswer: 1
              },
              {
                id: '2',
                question: 'Virtual DOM là gì?',
                options: [
                  'Một cách để tạo ra DOM thật',
                  'Một bản sao nhẹ của DOM thật trong bộ nhớ',
                  'Một thư viện JavaScript',
                  'Một framework CSS'
                ],
                correctAnswer: 1
              }
            ],
            currentQuestion: 0,
            userAnswers: [],
            isSubmitted: false
          }
        }
      ]
    },
    {
      id: '2',
      title: 'React Hooks',
      isExpanded: false,
      lessons: [
        {
          id: '6',
          title: 'useState Hook',
          duration: '30 phút',
          type: 'video',
          isCompleted: false
        },
        {
          id: '7',
          title: 'useEffect Hook',
          duration: '35 phút',
          type: 'video',
          isCompleted: false
        }
      ]
    }
  ]
};

const typeIcons = {
  video: PlayIcon,
  reading: BookOpenIcon,
  quiz: DocumentTextIcon,
  assignment: AcademicCapIcon
};

export default function CourseLearningPage({ courseId, lessonId }: { courseId: string; lessonId: string }) {
  const [courseData, setCourseData] = useState(mockCourseData);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(900); // 15 minutes in seconds
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentLesson = courseData.currentLesson;

  const toggleModule = (moduleId: string) => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(module => 
        module.id === moduleId 
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      )
    }));
  };

  const selectLesson = (lesson: Lesson) => {
    setCourseData(prev => ({
      ...prev,
      currentLesson: lesson
    }));
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const markLessonComplete = () => {
    setCourseData(prev => ({
      ...prev,
      modules: prev.modules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === currentLesson.id 
            ? { ...lesson, isCompleted: true }
            : lesson
        )
      })),
      currentLesson: { ...prev.currentLesson, isCompleted: true }
    }));
  };

  const getNextLesson = () => {
    const allLessons = courseData.modules.flatMap(module => module.lessons);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id);
    return currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  };

  const getPreviousLesson = () => {
    const allLessons = courseData.modules.flatMap(module => module.lessons);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === currentLesson.id);
    return currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderLessonContent = () => {
    switch (currentLesson.type) {
      case 'video':
        return (
          <div className="relative bg-black rounded-lg overflow-hidden">
            {/* Video Player */}
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayIcon className="w-20 h-20 mx-auto mb-4 opacity-80" />
                  <h3 className="text-xl font-semibold mb-2">{currentLesson.title}</h3>
                  <p className="text-blue-200">Video sẽ được tải ở đây</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-white text-sm mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <div className="flex-1 bg-white/20 rounded-full h-1">
                      <div 
                        className="bg-white h-1 rounded-full transition-all"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                    </div>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-white hover:text-blue-300 transition-colors"
                    >
                      {isPlaying ? (
                        <PauseIcon className="w-8 h-8" />
                      ) : (
                        <PlayIcon className="w-8 h-8" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:text-blue-300 transition-colors"
                    >
                      {isMuted ? (
                        <SpeakerXMarkIcon className="w-6 h-6" />
                      ) : (
                        <SpeakerWaveIcon className="w-6 h-6" />
                      )}
                    </button>

                    <select 
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="bg-black/50 text-white text-sm rounded px-2 py-1"
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={0.75}>0.75x</option>
                      <option value={1}>1x</option>
                      <option value={1.25}>1.25x</option>
                      <option value={1.5}>1.5x</option>
                      <option value={2}>2x</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="text-white hover:text-blue-300 transition-colors">
                      <Cog6ToothIcon className="w-6 h-6" />
                    </button>
                    
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-white hover:text-blue-300 transition-colors"
                    >
                      <ArrowsPointingOutIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reading':
        return (
          <div className="bg-white rounded-lg p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.content || '' }}
            />
          </div>
        );

      case 'quiz':
        const quiz = currentLesson.quiz;
        if (!quiz) return null;

        const currentQuestion = quiz.questions[quiz.currentQuestion];
        
        return (
          <div className="bg-white rounded-lg p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  Câu hỏi {quiz.currentQuestion + 1}/{quiz.questions.length}
                </h3>
                <div className="text-sm text-gray-600">
                  Quiz: {currentLesson.title}
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${((quiz.currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-medium text-gray-900 mb-6">
                {currentQuestion.question}
              </h4>
              
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <label key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={index}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      disabled={quiz.isSubmitted}
                    />
                    <span className="ml-3 text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                disabled={quiz.currentQuestion === 0}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Câu trước
              </button>
              
              {quiz.currentQuestion < quiz.questions.length - 1 ? (
                <button className="btn-primary">
                  Câu tiếp theo
                </button>
              ) : (
                <button className="btn-primary">
                  Nộp bài
                </button>
              )}
            </div>
          </div>
        );

      default:
        return <div>Nội dung không khả dụng</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r transition-all duration-300 ${sidebarOpen ? 'w-80' : 'w-0'} overflow-hidden`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 truncate">{courseData.title}</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          {courseData.modules.map((module) => (
            <div key={module.id} className="border-b">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full p-4 text-left hover:bg-gray-50 flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">{module.title}</span>
                {module.isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {module.isExpanded && (
                <div className="pb-2">
                  {module.lessons.map((lesson) => {
                    const IconComponent = typeIcons[lesson.type];
                    const isActive = lesson.id === currentLesson.id;
                    
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => selectLesson(lesson)}
                        className={`w-full p-3 text-left hover:bg-gray-50 flex items-center gap-3 ${
                          isActive ? 'bg-blue-50 border-r-2 border-primary' : ''
                        }`}
                      >
                        <IconComponent className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-500'}`} />
                        
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isActive ? 'text-primary' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500">{lesson.duration}</p>
                        </div>
                        
                        {lesson.isCompleted && (
                          <CheckCircleSolidIcon className="w-5 h-5 text-green-600" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <ListBulletIcon className="w-6 h-6" />
                </button>
              )}
              
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentLesson.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {currentLesson.duration}
                  </span>
                  <span className="capitalize">{currentLesson.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="btn-secondary"
              >
                Ghi chú
              </button>
              
              {!currentLesson.isCompleted && (
                <button
                  onClick={markLessonComplete}
                  className="btn-primary"
                >
                  Hoàn thành
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {renderLessonContent()}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div>
                {getPreviousLesson() && (
                  <button
                    onClick={() => selectLesson(getPreviousLesson()!)}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                    Bài trước
                  </button>
                )}
              </div>
              
              <div>
                {getNextLesson() && (
                  <button
                    onClick={() => selectLesson(getNextLesson()!)}
                    className="btn-primary flex items-center gap-2"
                  >
                    Bài tiếp theo
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Notes Panel */}
        {showNotes && (
          <div className="bg-white border-t p-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3">Ghi chú của bạn</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Viết ghi chú cho bài học này..."
                className="w-full h-32 border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <div className="flex justify-end mt-3">
                <button className="btn-primary">Lưu ghi chú</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
