'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrophyIcon,
  StarIcon,
  AcademicCapIcon,
  CalendarIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  FireIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'trophy' | 'star' | 'academic' | 'calendar' | 'users' | 'check' | 'fire' | 'clock';
  category: 'learning' | 'participation' | 'leadership' | 'special';
  earnedDate: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Badge {
  id: string;
  name: string;
  description: string;
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  category: string;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Học viên xuất sắc',
    description: 'Hoàn thành 10 khóa học với điểm số trên 90%',
    icon: 'academic',
    category: 'learning',
    earnedDate: '2024-01-15',
    points: 500,
    rarity: 'epic'
  },
  {
    id: '2',
    title: 'Người tham gia tích cực',
    description: 'Tham gia 20 sự kiện của câu lạc bộ',
    icon: 'users',
    category: 'participation',
    earnedDate: '2024-01-10',
    points: 300,
    rarity: 'rare'
  },
  {
    id: '3',
    title: 'Streak Master',
    description: 'Đăng nhập liên tục 30 ngày',
    icon: 'fire',
    category: 'special',
    earnedDate: '2024-01-05',
    points: 200,
    rarity: 'rare'
  },
  {
    id: '4',
    title: 'Người đóng góp',
    description: 'Chia sẻ 10 bài viết hữu ích',
    icon: 'star',
    category: 'participation',
    earnedDate: '2023-12-20',
    points: 150,
    rarity: 'common'
  }
];

const mockBadges: Badge[] = [
  {
    id: '1',
    name: 'Người học hỏi',
    description: 'Hoàn thành khóa học đầu tiên',
    progress: 1,
    maxProgress: 1,
    isCompleted: true,
    category: 'Học tập'
  },
  {
    id: '2',
    name: 'Chuyên gia',
    description: 'Hoàn thành 5 khóa học nâng cao',
    progress: 3,
    maxProgress: 5,
    isCompleted: false,
    category: 'Học tập'
  },
  {
    id: '3',
    name: 'Người kết nối',
    description: 'Tham gia 10 sự kiện networking',
    progress: 7,
    maxProgress: 10,
    isCompleted: false,
    category: 'Sự kiện'
  },
  {
    id: '4',
    name: 'Lãnh đạo',
    description: 'Dẫn dắt một dự án thành công',
    progress: 0,
    maxProgress: 1,
    isCompleted: false,
    category: 'Lãnh đạo'
  }
];

const iconMap = {
  trophy: TrophyIcon,
  star: StarIcon,
  academic: AcademicCapIcon,
  calendar: CalendarIcon,
  users: UserGroupIcon,
  check: CheckBadgeIcon,
  fire: FireIcon,
  clock: ClockIcon
};

const rarityColors = {
  common: 'bg-gray-100 border-gray-300 text-gray-700',
  rare: 'bg-blue-50 border-blue-300 text-blue-700',
  epic: 'bg-purple-50 border-purple-300 text-purple-700',
  legendary: 'bg-yellow-50 border-yellow-300 text-yellow-700'
};

const categoryColors = {
  learning: 'bg-green-100 text-green-800',
  participation: 'bg-blue-100 text-blue-800',
  leadership: 'bg-purple-100 text-purple-800',
  special: 'bg-yellow-100 text-yellow-800'
};

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'badges'>('achievements');

  const totalPoints = mockAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const completedBadges = mockBadges.filter(badge => badge.isCompleted).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Link href="/profile" className="hover:text-primary">
            Hồ sơ
          </Link>
          <span>/</span>
          <span className="text-gray-900">Thành tích</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thành tích của bạn</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tổng điểm</p>
                <p className="text-2xl font-bold text-gray-900">{totalPoints.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckBadgeIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Huy hiệu đã mở</p>
                <p className="text-2xl font-bold text-gray-900">{completedBadges}/{mockBadges.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <StarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Thành tích đạt được</p>
                <p className="text-2xl font-bold text-gray-900">{mockAchievements.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'achievements'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Thành tích
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'badges'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            Huy hiệu
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAchievements.map((achievement) => {
            const IconComponent = iconMap[achievement.icon];
            return (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg p-6 shadow-sm border-2 ${rarityColors[achievement.rarity]} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[achievement.category]}`}>
                        {achievement.category === 'learning' && 'Học tập'}
                        {achievement.category === 'participation' && 'Tham gia'}
                        {achievement.category === 'leadership' && 'Lãnh đạo'}
                        {achievement.category === 'special' && 'Đặc biệt'}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {achievement.rarity === 'common' && 'Phổ thông'}
                        {achievement.rarity === 'rare' && 'Hiếm'}
                        {achievement.rarity === 'epic' && 'Sử thi'}
                        {achievement.rarity === 'legendary' && 'Huyền thoại'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    {new Date(achievement.earnedDate).toLocaleDateString('vi-VN')}
                  </span>
                  <span className="font-semibold text-primary">+{achievement.points} điểm</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBadges.map((badge) => (
            <div
              key={badge.id}
              className={`bg-white rounded-lg p-6 shadow-sm border ${badge.isCompleted ? 'border-green-200' : 'border-gray-200'
                } hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${badge.isCompleted ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <CheckBadgeIcon className={`h-6 w-6 ${badge.isCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{badge.description}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {badge.category}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Tiến độ</span>
                  <span className="text-sm font-medium text-gray-900">
                    {badge.progress}/{badge.maxProgress}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${badge.isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                    style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                  ></div>
                </div>
                {badge.isCompleted && (
                  <p className="text-sm text-green-600 font-medium mt-2">✓ Hoàn thành</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
