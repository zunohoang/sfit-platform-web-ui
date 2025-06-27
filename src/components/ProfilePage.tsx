'use client';

import { useState } from 'react';
import Link from 'next/link';
import AvatarUploadModal from './AvatarUploadModal';
import {
  UserIcon,
  PencilIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  AcademicCapIcon,
  TrophyIcon,
  ChartBarIcon,
  CogIcon,
  ShieldCheckIcon,
  KeyIcon,
  BellIcon,
  EyeIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

// Sample user data
const userData = {
  id: 1,
  name: 'Nguyễn Văn A',
  email: 'nguyen.van.a@student.university.edu.vn',
  phone: '0123456789',
  avatar: '/api/placeholder/150/150',
  coverImage: '/api/placeholder/800/200',
  bio: 'Sinh viên năm 3 ngành Công nghệ thông tin, đam mê lập trình web và AI. Hiện đang tham gia các dự án về React.js và Python.',
  location: 'TP. Hồ Chí Minh',
  joinDate: '2023-09-15',
  studentId: 'IT2021001',
  major: 'Công nghệ thông tin',
  year: 'Năm 3',
  gpa: 3.75,
  socialLinks: {
    github: 'https://github.com/nguyenvana',
    linkedin: 'https://linkedin.com/in/nguyenvana',
    facebook: 'https://facebook.com/nguyenvana'
  },
  skills: [
    { name: 'JavaScript', level: 85, category: 'Programming' },
    { name: 'React.js', level: 80, category: 'Frontend' },
    { name: 'Python', level: 75, category: 'Programming' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'HTML/CSS', level: 90, category: 'Frontend' },
    { name: 'Git', level: 85, category: 'Tools' },
    { name: 'MongoDB', level: 65, category: 'Database' },
    { name: 'Docker', level: 60, category: 'DevOps' }
  ],
  achievements: [
    {
      id: 1,
      title: 'Hoàn thành khóa React.js',
      description: 'Đã hoàn thành xuất sắc khóa học React.js từ cơ bản đến nâng cao',
      date: '2025-01-15',
      type: 'course',
      badge: '🎓'
    },
    {
      id: 2,
      title: 'Top 10 Logo Design Contest',
      description: 'Đạt giải trong top 10 cuộc thi thiết kế logo câu lạc bộ',
      date: '2025-01-11',
      type: 'contest',
      badge: '🏆'
    },
    {
      id: 3,
      title: 'Workshop AI Certificate',
      description: 'Hoàn thành workshop AI và Machine Learning',
      date: '2025-01-08',
      type: 'workshop',
      badge: '🤖'
    }
  ],
  statistics: {
    coursesCompleted: 3,
    coursesInProgress: 2,
    eventsAttended: 8,
    tasksCompleted: 15,
    totalPoints: 850,
    rankInClub: 12
  },
  preferences: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    eventReminders: true,
    profileVisibility: 'public'
  }
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: userData.name,
    bio: userData.bio,
    phone: userData.phone,
    location: userData.location,
    github: userData.socialLinks.github,
    linkedin: userData.socialLinks.linkedin,
    facebook: userData.socialLinks.facebook
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to database
    console.log('Saving profile data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      bio: userData.bio,
      phone: userData.phone,
      location: userData.location,
      github: userData.socialLinks.github,
      linkedin: userData.socialLinks.linkedin,
      facebook: userData.socialLinks.facebook
    });
    setIsEditing(false);
  };

  const handleAvatarSave = (avatarFile: File | null) => {
    if (avatarFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(avatarFile);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: UserIcon },
    { id: 'achievements', label: 'Thành tích', icon: TrophyIcon, link: '/profile/achievements' },
    { id: 'skills', label: 'Kỹ năng', icon: AcademicCapIcon },
    { id: 'statistics', label: 'Thống kê', icon: ChartBarIcon },
    { id: 'activity', label: 'Hoạt động', icon: ChartBarIcon, link: '/profile/activity' },
    { id: 'settings', label: 'Cài đặt', icon: CogIcon, link: '/profile/settings' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Cover and Profile Picture */}
      <div className="relative mb-8">
        {/* Cover Image */}
        <div className="w-full h-48 md:h-64 bg-gradient-to-br from-[#267452] to-[#1f5e42] rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <button className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 rounded-lg transition-all duration-200">
            <CameraIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gray-300 rounded-full border-4 border-white overflow-hidden">
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#267452] to-[#1f5e42] flex items-center justify-center">
                  <UserIcon className="w-16 h-16 text-white" />
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAvatarModal(true)}
              className="absolute bottom-2 right-2 bg-white border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition-all duration-200"
            >
              <CameraIcon className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="absolute bottom-4 right-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary flex items-center"
            >
              <PencilIcon className="w-4 h-4 mr-2" />
              Chỉnh sửa hồ sơ
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Lưu
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center"
              >
                <XMarkIcon className="w-4 h-4 mr-2" />
                Hủy
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-20 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="text-center mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-gray-900 text-center w-full border-b border-gray-300 focus:border-[#267452] outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
                )}
                <p className="text-gray-600 mt-1">{userData.studentId} • {userData.major}</p>
                <p className="text-gray-500 text-sm">{userData.year}</p>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Giới thiệu</h3>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none text-sm"
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{userData.bio}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <EnvelopeIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <PhoneIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-[#267452] outline-none"
                    />
                  ) : (
                    <span>{userData.phone}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="flex-1 border-b border-gray-300 focus:border-[#267452] outline-none"
                    />
                  ) : (
                    <span>{userData.location}</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 mr-3 text-[#267452]" />
                  <span>Tham gia từ {new Date(userData.joinDate).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Liên kết xã hội</h3>
                <div className="space-y-2">
                  {['github', 'linkedin', 'facebook'].map((platform) => (
                    <div key={platform} className="flex items-center text-sm">
                      <span className="w-16 text-gray-600 capitalize">{platform}:</span>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData[platform as keyof typeof formData]}
                          onChange={(e) => handleInputChange(platform, e.target.value)}
                          className="flex-1 ml-2 border-b border-gray-300 focus:border-[#267452] outline-none text-[#267452]"
                        />
                      ) : (
                        <a
                          href={userData.socialLinks[platform as keyof typeof userData.socialLinks]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-[#267452] hover:underline"
                        >
                          {userData.socialLinks[platform as keyof typeof userData.socialLinks]}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;

                if (tab.link) {
                  return (
                    <Link
                      key={tab.id}
                      href={tab.link}
                      className="flex items-center px-4 py-2 text-sm font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {tab.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${activeTab === tab.id
                        ? 'border-[#267452] text-[#267452]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thống kê nhanh</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">{userData.statistics.coursesCompleted}</p>
                        <p className="text-sm text-gray-600">Khóa học hoàn thành</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">{userData.statistics.eventsAttended}</p>
                        <p className="text-sm text-gray-600">Sự kiện tham gia</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">{userData.statistics.tasksCompleted}</p>
                        <p className="text-sm text-gray-600">Nhiệm vụ hoàn thành</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#267452]">{userData.statistics.totalPoints}</p>
                        <p className="text-sm text-gray-600">Tổng điểm</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Liên kết nhanh</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Link
                        href="/profile/achievements"
                        className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-3 bg-yellow-200 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <TrophyIcon className="w-6 h-6 text-yellow-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Thành tích</h4>
                          <p className="text-sm text-gray-600">Xem chi tiết thành tích và huy hiệu</p>
                        </div>
                      </Link>

                      <Link
                        href="/profile/activity"
                        className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-3 bg-blue-200 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <ChartBarIcon className="w-6 h-6 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Hoạt động</h4>
                          <p className="text-sm text-gray-600">Lịch sử hoạt động và tiến độ</p>
                        </div>
                      </Link>

                      <Link
                        href="/profile/settings"
                        className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:shadow-md transition-all duration-200 group"
                      >
                        <div className="p-3 bg-gray-200 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <CogIcon className="w-6 h-6 text-gray-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Cài đặt</h4>
                          <p className="text-sm text-gray-600">Quản lý tài khoản và tùy chọn</p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Recent Achievements */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thành tích gần đây</h3>
                    <div className="space-y-3">
                      {userData.achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl">{achievement.badge}</span>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                            <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Tất cả thành tích</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userData.achievements.map((achievement) => (
                      <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-3xl">{achievement.badge}</span>
                          <div>
                            <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {achievement.type}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{new Date(achievement.date).toLocaleDateString('vi-VN')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Kỹ năng</h3>
                  <div className="space-y-4">
                    {userData.skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {skill.category}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#267452] h-2 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === 'statistics' && (
                <div className="space-y-6">
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thống kê chi tiết</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <AcademicCapIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-600">{userData.statistics.coursesCompleted}</p>
                        <p className="text-sm text-gray-600">Khóa học hoàn thành</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <TrophyIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-600">#{userData.statistics.rankInClub}</p>
                        <p className="text-sm text-gray-600">Xếp hạng trong CLB</p>
                      </div>
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <ChartBarIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-yellow-600">{userData.gpa}</p>
                        <p className="text-sm text-gray-600">GPA</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <BellIcon className="w-5 h-5 mr-2" />
                      Cài đặt thông báo
                    </h3>
                    <div className="space-y-4">
                      {Object.entries({
                        emailNotifications: 'Thông báo qua email',
                        pushNotifications: 'Thông báo đẩy',
                        weeklyDigest: 'Bản tin tuần',
                        eventReminders: 'Nhắc nhở sự kiện'
                      }).map(([key, label]) => (
                        <label key={key} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={userData.preferences[key as keyof typeof userData.preferences] as boolean}
                            className="w-4 h-4 text-[#267452] border-gray-300 rounded focus:ring-[#267452]"
                          />
                          <span className="text-gray-700">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <EyeIcon className="w-5 h-5 mr-2" />
                      Cài đặt riêng tư
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hiển thị hồ sơ
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#267452] focus:border-transparent outline-none">
                          <option value="public">Công khai</option>
                          <option value="members">Chỉ thành viên CLB</option>
                          <option value="private">Riêng tư</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="card">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <ShieldCheckIcon className="w-5 h-5 mr-2" />
                      Bảo mật
                    </h3>
                    <div className="space-y-3">
                      <button className="btn-secondary w-full flex items-center justify-center">
                        <KeyIcon className="w-4 h-4 mr-2" />
                        Đổi mật khẩu
                      </button>
                      <button className="btn-secondary w-full">
                        Xem phiên đăng nhập
                      </button>
                      <button className="btn-secondary w-full">
                        Xác thực 2 bước
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Upload Modal */}
      <AvatarUploadModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        currentAvatar={userAvatar || undefined}
        onSave={handleAvatarSave}
      />
    </div>
  );
}
