# 🍔 Fusion - Full Stack Food Ordering Web App

Fusion is a full-stack food ordering web application built using **React.js, Redux Toolkit, RTK Query, and ASP.NET Core Web API**.  
It supports efficient state management, secure authentication, and scalable API integration.

---

## 🚀 Key Features

- 🛒 Browse food menu with images
- 📦 Place orders
- 🔐 User authentication using ASP.NET Identity
- 🧑‍💼 Admin dashboard for managing menu items
- ➕ Add / Update / Delete menu items (CRUD)
- ⚡ Optimized API calls using RTK Query
- 🔄 Global state management with Redux Toolkit
- 🖼️ Image upload support

---

## 🧠 Tech Stack

### 🔹 Frontend
- React.js
- Redux Toolkit
- RTK Query (for API handling)
- CSS / Bootstrap

### 🔹 Backend
- ASP.NET Core Web API
- Entity Framework Core
- ASP.NET Identity (Authentication & Authorization)
- JWT

### 🔹 Database
- SQL Server

---

## 🏗️ Architecture Highlights

- 🔹 Clean separation of frontend and backend
- 🔹 RESTful API design
- 🔹 Centralized state management using Redux Toolkit
- 🔹 Efficient data fetching & caching using RTK Query
- 🔹 Secure authentication using ASP.NET Identity

---

## 📂 Project Structure

```
Fusion-FoodApp/
│
├── Fusion_API/                    # ASP.NET Core Backend
│   ├── Controllers/              # API Controllers
│   │   ├── AuthController.cs
│   │   ├── MenuItemController.cs
│   │   ├── OrderHeaderController.cs
│   │   └── OrderDetailsController.cs
│   │
│   ├── Data/
│   │   └── ApplicationDbContext.cs
│   │
│   ├── Models/
│   │   ├── MenuItem.cs
│   │   ├── OrderHeader.cs
│   │   ├── OrderDetails.cs
│   │   ├── ApplicationUser.cs
│   │   └── Dto/
│   │
│   ├── Migrations/               # EF Core Migrations
│   │
│   ├── Utility/
│   │   └── SD.cs
│   │
│   ├── wwwroot/
│   │   └── images/              # Stored images
│   │
│   ├── Program.cs
│   ├── appsettings.json
│   └── .gitignore
│
├── Fusion_Frontend/             # React Frontend
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── menuItem/
│   │   │   ├── orders/
│   │   │   └── ui/
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── cart/
│   │   │   ├── menu/
│   │   │   └── order/
│   │   │
│   │   ├── store/
│   │   │   ├── api/             # RTK Query APIs
│   │   │   ├── slice/           # Redux slices
│   │   │   └── store.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   └── .gitignore
│
└── README.md
```
