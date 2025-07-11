# SFIT Club - Ứng dụng Web Câu lạc bộ

Ứng dụng web dành cho thành viên câu lạc bộ SFIT với giao diện hiện đại và thân thiện người dùng.

## 🌟 Tính năng chính

### 📰 Bản tin
- Xem các bản tin mới nhất từ câu lạc bộ
- Tìm kiếm và lọc theo danh mục
- Hiển thị bài viết nổi bật
- Sidebar với bài viết phổ biến và tag cloud

### 🎓 Khóa học
- Danh sách các khóa học có sẵn
- Theo dõi tiến độ học tập
- Lọc theo danh mục, độ khó
- Hiển thị khóa học đã đăng ký

### 📅 Sự kiện
- Xem các sự kiện sắp tới và đã qua
- Đăng ký tham gia sự kiện
- Lọc theo loại sự kiện
- Thông báo sự kiện sắp hết chỗ

### 🔔 Thông báo
- Nhận thông báo từ hệ thống và CLB
- Phân loại theo mức độ quan trọng
- Lọc theo danh mục và trạng thái
- Đánh dấu đã đọc/chưa đọc

### ✅ Nhiệm vụ
- Quản lý bài tập và dự án
- Theo dõi tiến độ hoàn thành
- Phân loại theo mức độ ưu tiên
- Thống kê nhiệm vụ

### 👤 Hồ sơ cá nhân
- Quản lý thông tin cá nhân
- Xem thành tích và kỹ năng
- Thống kê hoạt động
- Cài đặt tài khoản và bảo mật

## 🎨 Thiết kế

- **Màu chủ đạo**: Xanh lá cây đậm (#267452)
- **Responsive**: Tương thích với tất cả thiết bị
- **Modern UI**: Giao diện hiện đại với Tailwind CSS
- **User-friendly**: Dễ sử dụng và điều hướng

## 🚀 Công nghệ sử dụng

- **Framework**: Next.js 15 với App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Deployment**: Vercel Ready

## 📦 Cài đặt và Chạy

1. **Clone repository**
```bash
git clone <repository-url>
cd sfit-user
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Chạy development server**
```bash
npm run dev
```

4. **Mở trình duyệt**
```
http://localhost:3000
```

## 📁 Cấu trúc thư mục

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Trang chủ (Dashboard)
│   ├── news/              # Trang bản tin
│   ├── courses/           # Trang khóa học
│   ├── events/            # Trang sự kiện
│   ├── notifications/     # Trang thông báo
│   ├── tasks/             # Trang nhiệm vụ
│   └── profile/           # Trang hồ sơ
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Dashboard.tsx      # Dashboard component
│   ├── NewsList.tsx       # Danh sách bản tin
│   ├── CoursesList.tsx    # Danh sách khóa học
│   ├── EventsList.tsx     # Danh sách sự kiện
│   ├── NotificationsList.tsx # Danh sách thông báo
│   ├── TasksList.tsx      # Danh sách nhiệm vụ
│   ├── ProfilePage.tsx    # Trang hồ sơ
│   ├── AvatarUploadModal.tsx # Modal upload avatar
│   ├── UserAvatar.tsx     # Component avatar
│   └── Toast.tsx          # Thông báo toast
└── globals.css           # Global styles
```

## 🎯 Tính năng nổi bật

### Dashboard Tổng quan
- Thống kê nhanh về hoạt động
- Bản tin mới nhất
- Sự kiện sắp tới
- Khóa học đang tham gia
- Thao tác nhanh

### Tìm kiếm và Lọc
- Tìm kiếm thông minh
- Lọc đa tiêu chí
- Sắp xếp kết quả
- Lưu bộ lọc yêu thích

### Responsive Design
- Mobile-first approach
- Tablet và desktop optimized
- Touch-friendly interface
- Fast loading

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Consistent design language
- Accessibility compliant

## 🔧 Tùy chỉnh

### Màu sắc
Thay đổi màu chủ đạo trong `globals.css`:
```css
:root {
  --primary-green: #267452;
  --primary-green-light: #2d8459;
  --primary-green-dark: #1f5e42;
}
```

### Components
Tất cả components đều có thể tùy chỉnh và mở rộng dễ dàng.

## 📱 Screenshots

### Trang chủ (Dashboard)
- Tổng quan hoạt động thành viên
- Thống kê nhanh
- Shortcuts đến các tính năng chính

### Trang Bản tin
- Layout blog hiện đại
- Featured article
- Sidebar với nội dung liên quan

### Trang Khóa học
- Grid layout cho khóa học
- Progress tracking
- Filter và search

### Trang Sự kiện
- Card-based layout
- Event status indicators
- Registration functionality

### Trang Hồ sơ
- Tab-based navigation
- Editable profile
- Skills và achievements
- Settings và privacy

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 👥 Team

Được phát triển bởi SFIT Club Development Team.

---

**SFIT Club** - Nơi kết nối đam mê công nghệ! 🚀
#   s f i t - p l a t f o r m - w e b - u i  
 