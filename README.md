# 🚌 Hệ thống Quản lý Xe Buýt

Hệ thống quản lý xe buýt hoàn chỉnh với giao diện web hiện đại, hỗ trợ theo dõi GPS realtime và quản lý toàn diện.

## 📋 Mục lục
- [Cài đặt hệ thống](#-cài-đặt-hệ-thống)
- [Hướng dẫn sử dụng](#-hướng-dẫn-sử-dụng)
- [Tính năng chính](#-tính-năng-chính)
- [Phân quyền người dùng](#-phân-quyền-người-dùng)
- [API Documentation](#-api-documentation)
- [Troubleshooting](#-troubleshooting)

## 🚀 Cài đặt hệ thống

### Bước 1: Yêu cầu hệ thống
```bash
- Node.js 18+ (https://nodejs.org/)
- MySQL Server (https://dev.mysql.com/downloads/)
- Git (https://git-scm.com/)
```

### Bước 2: Clone và cài đặt
```bash
# 1. Clone repository từ GitHub
git clone https://github.com/vinh3123410433/QuanLyXeBustest.git
cd QuanLyXeBustest

# 2. Cài đặt dependencies cho Backend
cd backend
npm install

# 3. Cài đặt dependencies cho Frontend
cd ../frontend
npm install
```

### Bước 3: Cấu hình Database
```bash
# 1. Tạo database MySQL
mysql -u root -p
CREATE DATABASE QuanLyXeBuyt;
exit

# 2. Chạy script khởi tạo database
mysql -u root -p QuanLyXeBuyt < backend/database/init.sql
```

### Bước 4: Cấu hình môi trường

**🔧 Tạo file .env từ template:**
```bash
# 1. Copy file .env.example thành .env
# Trong thư mục gốc dự án:
cp .env.example .env

# 2. Copy cho backend:
cp .env.example backend/.env

# 3. Copy cho frontend (nếu cần):
cp .env.example frontend/.env
```

**⚙️ Cấu hình database trong file .env:**
```env
# === CẤU HÌNH DATABASE ===
DB_HOST=localhost
DB_PORT=3306
DB_NAME=QuanLyXeBuyt
DB_USER=root
DB_PASSWORD=your_mysql_password_here

# === CẤU HÌNH JWT ===
JWT_SECRET=your-super-secret-key-here-change-this
JWT_REFRESH_SECRET=your-refresh-secret-key-here-change-this
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# === CẤU HÌNH SERVER ===
PORT=3000
NODE_ENV=development

# === CẤU HÌNH FRONTEND ===
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

**🔒 Lưu ý quan trọng:**
- File `.env` đã được thêm vào `.gitignore` nên sẽ KHÔNG được push lên GitHub
- Mỗi developer có thể có cấu hình `.env` khác nhau
- Chỉ file `.env.example` được push lên GitHub làm template

### Bước 5: Chạy hệ thống
```bash
# Terminal 1: Chạy Backend Server
cd backend
npm run dev

# Terminal 2: Chạy Frontend Server  
cd frontend
npm run dev
```

### Bước 6: Truy cập hệ thống
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api

## 👤 Tài khoản mẫu để test
```
Admin:
- Email: admin@busmanager.com
- Password: 123456

Driver:
- Email: driver@busmanager.com  
- Password: 123456

Parent:
- Email: parent@busmanager.com
- Password: 123456
```

## 📖 Hướng dẫn sử dụng

### 🔐 Đăng nhập hệ thống
1. Truy cập http://localhost:5173
2. Nhập email và password (xem tài khoản mẫu ở trên)
3. Chọn "Đăng nhập"
4. Hệ thống sẽ chuyển hướng theo quyền của bạn

### 👨‍💼 Admin - Quản trị viên
**Chức năng:**
- ✅ Quản lý tất cả người dùng (thêm/sửa/xóa)
- ✅ Quản lý xe buýt và tài xế
- ✅ Quản lý tuyến đường và điểm dừng
- ✅ Xem báo cáo tổng quan
- ✅ Quản lý lịch trình toàn hệ thống

**Hướng dẫn sử dụng:**
```
1. Đăng nhập với tài khoản admin
2. Dashboard hiển thị tổng quan hệ thống
3. Menu bên trái có các chức năng:
   - Users: Quản lý người dùng  
   - Buses: Quản lý xe buýt
   - Routes: Quản lý tuyến đường
   - Schedules: Quản lý lịch trình
   - Tracking: Theo dõi GPS
```

### 🚐 Driver - Tài xế
**Chức năng:**
- ✅ Xem lịch trình của mình
- ✅ Cập nhật vị trí GPS
- ✅ Báo cáo tình trạng xe
- ✅ Xem danh sách học sinh trên xe

**Hướng dẫn sử dụng:**
```
1. Đăng nhập với tài khoản driver
2. Xem lịch trình hôm nay
3. Bật GPS tracking khi bắt đầu chuyến
4. Cập nhật trạng thái chuyến đi
```

### 👨‍👩‍👧‍👦 Parent - Phụ huynh  
**Chức năng:**
- ✅ Xem vị trí xe buýt realtime
- ✅ Nhận thông báo về lịch trình
- ✅ Xem thông tin con em
- ✅ Lịch sử đi học

**Hướng dẫn sử dụng:**
```
1. Đăng nhập với tài khoản parent
2. Dashboard hiển thị thông tin con em
3. Click "Track Bus" để xem vị trí xe
4. Nhận thông báo khi xe đến gần
```

## 🎯 Tính năng chính

### 🗂️ Quản lý người dùng
- **Đăng ký/Đăng nhập**: Hệ thống xác thực bằng JWT
- **Phân quyền**: 4 loại tài khoản (Admin, Dispatch, Driver, Parent)
- **Quản lý hồ sơ**: Cập nhật thông tin cá nhân
- **Bảo mật**: Mã hóa password, refresh token tự động

### 🚌 Quản lý xe buýt
- **Danh sách xe**: Xem tất cả xe buýt trong hệ thống
- **Thêm xe mới**: Thông tin biển số, capacity, model
- **Phân công tài xế**: Gán tài xế cho từng xe
- **Theo dõi trạng thái**: Active, Maintenance, Inactive

### 🗺️ Quản lý tuyến đường
- **Tạo tuyến đường**: Định nghĩa điểm đầu và điểm cuối
- **Điểm dừng**: Thêm các điểm dừng trên tuyến
- **Khoảng cách**: Tính toán khoảng cách và thời gian
- **Hiển thị bản đồ**: Xem tuyến đường trên map

### 📅 Quản lý lịch trình
- **Lịch đưa đón**: Thời gian đi và về
- **Phân công xe**: Gán xe và tài xế cho từng tuyến
- **Theo ngày**: Lịch trình theo thứ trong tuần
- **Thông báo**: Gửi thông báo thay đổi lịch

### 🛰️ Theo dõi GPS Realtime
- **Vị trí xe buýt**: Cập nhật vị trí theo thời gian thực
- **Bản đồ tương tác**: Leaflet map với marker xe buýt  
- **Socket.io**: Cập nhật realtime không cần refresh
- **Lịch sử di chuyển**: Lưu trữ route đã đi

### 🔔 Hệ thống thông báo
- **Thông báo tự động**: Xe đến gần điểm dừng
- **Thông báo thủ công**: Admin gửi thông báo quan trọng
- **Phân loại**: Info, Warning, Alert, Success
- **Lịch sử**: Lưu trữ tất cả thông báo

## 👥 Phân quyền người dùng

| Tính năng | Admin | Dispatch | Driver | Parent |
|-----------|-------|----------|---------|---------|
| Quản lý người dùng | ✅ | ✅ | ❌ | ❌ |
| Quản lý xe buýt | ✅ | ✅ | 👁️ | ❌ |
| Quản lý tuyến đường | ✅ | ✅ | 👁️ | ❌ |
| Quản lý lịch trình | ✅ | ✅ | 👁️ | ❌ |
| Theo dõi GPS | ✅ | ✅ | ✅ | ✅ |
| Gửi thông báo | ✅ | ✅ | ❌ | ❌ |
| Cập nhật vị trí | ❌ | ❌ | ✅ | ❌ |
| Xem con em | ❌ | ❌ | ❌ | ✅ |

*Chú thích: ✅ = Toàn quyền, 👁️ = Chỉ xem, ❌ = Không có quyền*

## 📡 API Documentation

### Authentication Endpoints
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@busmanager.com",
  "password": "123456"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {...},
    "accessToken": "jwt-token",
    "refreshToken": "refresh-token"
  }
}
```

### Users Management
```http
GET /api/users              # Danh sách người dùng
POST /api/users             # Tạo người dùng mới
GET /api/users/:id          # Chi tiết người dùng
PUT /api/users/:id          # Cập nhật người dùng
DELETE /api/users/:id       # Xóa người dùng
```

### Bus Management  
```http
GET /api/buses              # Danh sách xe buýt
POST /api/buses             # Thêm xe buýt mới
GET /api/buses/:id          # Chi tiết xe buýt
PUT /api/buses/:id          # Cập nhật xe buýt
DELETE /api/buses/:id       # Xóa xe buýt
```

### GPS Tracking
```http
POST /api/tracking/location # Cập nhật vị trí
GET /api/tracking/bus/:id   # Lấy vị trí hiện tại
```

### WebSocket Events
```javascript
// Kết nối Socket.io
const socket = io('http://localhost:3000');

// Theo dõi xe buýt
socket.emit('join-bus-tracking', busId);

// Nhận cập nhật vị trí
socket.on('location-update', (data) => {
  console.log('New location:', data);
});
```

## 🛠️ Troubleshooting

### ❌ Lỗi thường gặp và cách khắc phục

#### 1. Không đăng nhập được
```bash
Lỗi: "Invalid email or password"

Giải pháp:
1. Kiểm tra email và password
2. Đảm bảo đã chạy script init.sql
3. Restart backend server
4. Kiểm tra kết nối database
```

#### 2. Backend không chạy được
```bash
Lỗi: "Cannot connect to database"

Giải pháp:
1. Kiểm tra MySQL server đã chạy chưa
2. Kiểm tra thông tin database trong .env
3. Tạo database: CREATE DATABASE QuanLyXeBuyt;
4. Chạy lại: npm run dev
```

#### 3. Frontend không kết nối được API
```bash
Lỗi: "Network Error" hoặc "CORS Error"

Giải pháp:
1. Kiểm tra backend đang chạy trên port 3000
2. Kiểm tra VITE_API_URL trong frontend/.env
3. Restart frontend server
```

#### 4. GPS Tracking không hoạt động
```bash
Lỗi: Không thấy vị trí xe buýt

Giải pháp:
1. Kiểm tra Socket.io connection
2. Kiểm tra VITE_SOCKET_URL
3. Test bằng tài khoản Driver để cập nhật vị trí
```

### 🔧 Commands hữu ích

```bash
# Kiểm tra port đang sử dụng
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install

# Restart MySQL service (Windows)
net stop mysql80
net start mysql80

# Xem log backend
cd backend
npm run dev

# Xem log frontend  
cd frontend  
npm run dev
```

## 📁 Cấu trúc dự án

```
QuanLyXeBustest/
├── 📂 backend/              # Node.js + Express API
│   ├── 📂 src/
│   │   ├── 📂 controllers/  # Xử lý logic API
│   │   ├── 📂 models/       # Database models (Sequelize)
│   │   ├── 📂 routes/       # API endpoints
│   │   ├── 📂 middleware/   # Authentication, validation
│   │   ├── 📂 utils/        # Helper functions
│   │   └── 📄 server.js     # Entry point
│   ├── 📂 database/         # SQL scripts
│   ├── 📄 package.json      # Dependencies
│   └── 📄 .env             # Environment variables
│
├── 📂 frontend/             # React + Vite app
│   ├── 📂 src/
│   │   ├── 📂 components/   # React components
│   │   ├── 📂 pages/        # Page components
│   │   ├── 📂 hooks/        # Custom hooks (Zustand)
│   │   ├── 📂 services/     # API calls (Axios)
│   │   └── 📄 main.jsx      # Entry point
│   ├── 📄 package.json      # Dependencies
│   └── 📄 .env             # Environment variables
│
├── 📄 docker-compose.yml    # Docker setup
├── 📄 .gitignore           # Git ignore rules
└── 📄 README.md            # Documentation
```

## 🚀 Deployment (Production)

### Sử dụng Docker
```bash
# 1. Build và chạy với Docker Compose
docker-compose up -d --build

# 2. Kiểm tra containers
docker-compose ps

# 3. Xem logs
docker-compose logs -f

# 4. Dừng hệ thống
docker-compose down
```

### Manual Deployment
```bash
# 1. Build frontend
cd frontend
npm run build

# 2. Setup Nginx để serve frontend
# Copy build files to /var/www/html

# 3. Run backend với PM2
cd backend  
npm install -g pm2
pm2 start src/server.js --name "bus-api"

# 4. Setup database
mysql -u root -p < database/init.sql
```

## 🤝 Đóng góp

### Quy trình đóng góp
1. **Fork** repository này
2. **Clone** về máy local
3. **Tạo branch** mới: `git checkout -b feature/ten-tinh-nang`
4. **Commit** changes: `git commit -m 'Thêm tính năng ABC'`
5. **Push** lên GitHub: `git push origin feature/ten-tinh-nang`
6. Tạo **Pull Request**

### Coding Standards
- **Backend**: ESLint + Prettier
- **Frontend**: ESLint + Prettier  
- **Commit message**: Tiếng Việt có dấu
- **Variable names**: camelCase
- **File names**: kebab-case

## 📞 Liên hệ & Hỗ trợ

- **GitHub**: [vinh3123410433](https://github.com/vinh3123410433)
- **Repository**: [QuanLyXeBustest](https://github.com/vinh3123410433/QuanLyXeBustest)
- **Issues**: [Báo cáo lỗi](https://github.com/vinh3123410433/QuanLyXeBustest/issues)

## 📄 License

Dự án này sử dụng [MIT License](LICENSE) - xem file LICENSE để biết thêm chi tiết.

---

**🎉 Chúc bạn sử dụng hệ thống thành công! 🚌✨**