# 🛒 Cartmandu

**Cartmandu** is an e-commerce platform built to simplify online shopping. It offers a user-friendly experience for browsing and purchasing a wide range of products, from electronics to fashion and more. Designed with both functionality and ease of use in mind, Cartmandu aims to provide a reliable and accessible shopping experience.

---

## 🚀 Core Functionality

- **User and Admin Authentication**: Secure registration and login for users and vendors.
- **Admin Dashboard**: Manage users, products, orders, and configurations.
- **User Profiles**: Manage personal info, addresses, and payment options.
- **Shopping Cart System**: Add, update, or remove items before checkout.
- **Dynamic Product Catalog**: Advanced filtering, category navigation, and precise search.
- **Search & Filters**: Multifaceted filtering by price, category, and brand.
- **Reviews & Ratings**: Users can review and rate products.
- **Order Tracking & History**: Users can track orders and review past purchases.
- **Wishlist**: Save items for future purchases.
- **Coupon System**: Apply discount codes during checkout.
- **Secure Checkout**: Streamlined and secure order placement.


---

## 🏗️ Technological Architecture

**Cartmandu** is built on the robust **MERN stack** for performance and scalability.

### 🔹 Frontend

- **Next.js**: React framework with SSR & SSG for better performance and SEO.
- **App Router**: Modern routing system for scalable interface design.
- **Shadcn UI**: Beautiful, accessible UI components using Radix UI + Tailwind CSS.
- **Formik + Yup**: Form state management and validation.
- **Axios**: Promise-based HTTP client.
- **Redux**: Predictable state management across the app.

### 🔹 Backend

- **Node.js + Express.js**: Scalable and efficient backend architecture.
- **Mongoose**: MongoDB ODM for schema modeling and data management.
- **bcrypt**: Secure password hashing.
- **jsonwebtoken (JWT)**: Stateless user authentication.

### 🔹 Database

- **MongoDB**: Flexible NoSQL database for high-volume data.

---

## 🛠️ Project Development Roadmap

### ✅ Phase 1 — Core Setup *(In Progress)*

**Goal**: Set up user/vendor auth, basic product listing, and cart.

#### Frontend
- [x] User Login & Registration
- [x] Logout Functionality
- [x] Product Display UI
- [ ] Basic Cart Functionality (add/remove items)

#### Backend
- [x] User Registration Endpoint (`bcrypt` + email check)
- [x] User Login Endpoint (`JWT` generation)
- [x] Get All Users Endpoint
- [x] Product Management Endpoints (create/update/view) 
- [ ] Basic Cart API

---

### 🔄 Phase 2 — Product Interaction & Checkout

**Goal**: Add search, filters, payment, order tracking, and user profiles.

- [ ] Advanced Search & Filters
- [ ] Payment Gateway Integration
- [ ] Order Confirmation & Notifications
- [ ] Reviews & Ratings
- [ ] Profile Management
- [ ] Invoice/Receipt Generation

---

### 🔮 Phase 3 — Personalization & Admin Panel

**Goal**: Personalization, full admin control, and analytics.

- [ ] Personalized Recommendations
- [ ] Wishlist & Favorites
- [ ] Coupons & Promo System
- [ ] Full Admin Dashboard
- [ ] Customer Support Integration
- [ ] Analytics & Reporting

---

## 🧰 Setup and Installation

### 📦 Prerequisites

- Node.js (LTS recommended)
- MongoDB 

### 📁 Installation Steps

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cartmandu.git
cd cartmandu
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_strong_random_secret_key
```

Start the backend server:

```bash
npm start
```

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📬 Contact Information

- **Cartmandu Development Team**: [Your Team Name / Your Name]  
- **Email**: [your-email@example.com]  
- **GitHub**: [https://github.com/your-username](https://github.com/your-username)



