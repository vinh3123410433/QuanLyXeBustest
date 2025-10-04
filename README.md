# Bus Management System

Hệ thống quản lý xe buýt hoàn chỉnh cho trường học/hệ thống công cộng.

## Công nghệ sử dụng

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router
- Axios
- Socket.io Client
- Leaflet + React-Leaflet
- React Testing Library

### Backend
- Node.js 18+
- Express.js 4.x
- Sequelize ORM
- MySQL
- JWT Authentication
- bcrypt
- Socket.io
- Jest + Supertest

### DevOps
- Docker + Docker Compose
- ESLint + Prettier

## Tính năng chính

### Quản lý người dùng
- Đăng nhập/đăng ký
- Phân quyền: Admin, Dispatch/Operator, Driver, Parent
- JWT Authentication (Access + Refresh Token)

### Quản lý hệ thống
- Quản lý học sinh và phụ huynh
- Quản lý tài xế và xe buýt
- Quản lý tuyến đường và điểm dừng
- Quản lý lịch trình

### Theo dõi GPS
- Theo dõi vị trí xe buýt realtime
- Hiển thị trên bản đồ
- Thông báo cho phụ huynh

### Dashboard và báo cáo
- Trang tổng quan với số liệu thống kê
- Lịch trình chi tiết
- Trung tâm thông báo

## Cài đặt và chạy

### Yêu cầu
- Node.js 18+
- Docker & Docker Compose
- MySQL (hoặc chạy qua Docker)

### Chạy với Docker
```bash
# Clone repository
git clone <repository-url>
cd bus-management-system

# Chạy toàn bộ hệ thống
docker-compose up -d

# Dừng hệ thống
docker-compose down
```

### Chạy development
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (terminal mới)
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Đăng nhập
- POST `/api/auth/register` - Đăng ký
- POST `/api/auth/refresh` - Refresh token
- POST `/api/auth/logout` - Đăng xuất

### Users
- GET `/api/users` - Danh sách người dùng
- POST `/api/users` - Tạo người dùng
- GET `/api/users/:id` - Chi tiết người dùng
- PUT `/api/users/:id` - Cập nhật người dùng
- DELETE `/api/users/:id` - Xóa người dùng

### Buses
- GET `/api/buses` - Danh sách xe buýt
- POST `/api/buses` - Tạo xe buýt mới
- GET `/api/buses/:id` - Chi tiết xe buýt
- PUT `/api/buses/:id` - Cập nhật xe buýt
- DELETE `/api/buses/:id` - Xóa xe buýt

### Routes & Stops
- GET `/api/routes` - Danh sách tuyến đường
- POST `/api/routes` - Tạo tuyến đường
- GET `/api/stops` - Danh sách điểm dừng
- POST `/api/stops` - Tạo điểm dừng

### GPS Tracking
- POST `/api/tracking/location` - Cập nhật vị trí xe
- GET `/api/tracking/bus/:id` - Lấy vị trí hiện tại của xe
- WebSocket: `/socket` - Realtime tracking

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Cấu trúc thư mục

```
bus-management-system/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Sequelize models
│   │   ├── middleware/      # Authentication, validation
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helpers, utilities
│   │   └── config/          # Database, environment config
│   ├── tests/               # Jest tests
│   ├── Dockerfile
│   └── package.json
├── frontend/                # React + Vite app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── utils/           # Utilities
│   │   └── styles/          # Tailwind styles
│   ├── public/              # Static assets
│   ├── tests/               # React Testing Library tests
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml       # Docker orchestration
├── .env.example             # Environment variables template
└── README.md
```

## Môi trường phát triển

Sao chép `.env.example` thành `.env` và cập nhật các biến môi trường:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bus_management
DB_USER=root
DB_PASSWORD=password

# JWT
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development

# Frontend
VITE_API_URL=http://localhost:3000/api
```

## Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## License

MIT License