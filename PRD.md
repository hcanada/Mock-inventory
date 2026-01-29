# Product Requirements Document (PRD)

## Project Title

**Inventory Management System (IMS)** – MERN Stack Showcase Project

---

## 1. Purpose & Vision

### 1.1 Purpose

The purpose of this project is to build an **intermediate-level Inventory Management System** that demonstrates core and advanced capabilities of the **MERN stack (MongoDB, Express.js, React, Node.js)**.

This project is **not intended for a real-world business use case**, but rather as a **portfolio-quality demonstration** of:

- Full-stack architecture
- API design
- Database modeling
- Authentication & authorization
- State management
- UI/UX patterns commonly used in production systems

### 1.2 Vision

Create a clean, professional, dashboard-style application that _looks like a real internal tool_ and clearly communicates engineering competence during code reviews, interviews, and portfolio evaluations.

---

## 2. Goals & Non-Goals

### 2.1 Goals

- Demonstrate end-to-end MERN development
- Implement secure authentication and role-based authorization
- Showcase MongoDB querying and aggregation
- Build a modular, scalable backend architecture
- Create a responsive, dashboard-style frontend
- Emphasize clean code, separation of concerns, and best practices

### 2.2 Non-Goals

- No real payment processing
- No real supplier integrations
- No external ERP or warehouse system integration
- No mobile-native app (web-only)

---

## 3. Target Audience

### Primary Audience

- Recruiters
- Hiring managers
- Technical interviewers

### Secondary Audience

- Developers reviewing the codebase
- Peers or mentors providing feedback

---

## 4. Tech Stack

### 4.1 Frontend

- **React** (with Hooks)
- **React Router** (routing)
- **Redux Toolkit** (state management)
- **Axios** (API communication)
- **Recharts** (data visualization)
- **Tailwind CSS** (styling)

### 4.2 Backend

- **Node.js** (runtime)
- **Express.js** (REST API framework)
- **JWT** (authentication)
- **bcrypt** (password hashing)
- **Express Middleware** (auth, logging, error handling)

### 4.3 Database

- **MongoDB** (NoSQL database)
- **Mongoose** (ODM)

### 4.4 Dev & Deployment (Optional)

- Vercel (frontend)
- Render / Railway (backend)
- MongoDB Atlas
- dotenv (environment variables)

---

## 5. User Roles & Permissions

### 5.1 Admin

- Full access to all features
- Manage users
- Create, edit, delete products
- View analytics & logs

### 5.2 Staff

- View inventory
- Update product quantities
- Cannot delete products
- Cannot manage users

---

## 6. Core Functional Requirements

### 6.1 Authentication & Authorization

**Features**

- User registration
- User login
- JWT-based authentication
- Protected backend routes
- Role-based frontend routing

**Acceptance Criteria**

- Unauthorized users cannot access protected APIs
- Staff users cannot perform admin-only actions

---

### 6.2 Inventory Management (CRUD)

**Product Fields**

- Name
- SKU (unique)
- Category
- Quantity
- Price
- Supplier (string-based)
- Status (auto-calculated)
- CreatedBy (user reference)
- CreatedAt / UpdatedAt

**Actions**

- Add product
- Edit product
- Soft delete product
- Update quantity

**Business Logic**

- Status auto-updates:
  - Quantity > 10 → `In Stock`
  - Quantity 1–10 → `Low Stock`
  - Quantity = 0 → `Out of Stock`

---

### 6.3 Search, Filter & Sort

**Search**

- By product name
- By SKU

**Filters**

- Category
- Stock status

**Sorting**

- Quantity (asc/desc)
- Price (asc/desc)

---

### 6.4 Dashboard & Analytics

**Metrics**

- Total products
- Low stock count
- Out of stock count
- Total inventory value

**Charts**

- Products by category
- Stock status distribution
- Products added over time

**Backend**

- MongoDB aggregation pipelines

---

### 6.5 Activity Log (Audit Trail)

**Tracked Events**

- Product created
- Product updated
- Quantity changed
- Product deleted

**Log Fields**

- Action type
- Product reference
- User reference
- Timestamp

---

## 7. API Design (High-Level)

### Auth Routes

- POST `/api/auth/register`
- POST `/api/auth/login`

### Product Routes

- GET `/api/products`
- POST `/api/products`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`

### Dashboard Routes

- GET `/api/dashboard/summary`
- GET `/api/dashboard/charts`

### Logs

- GET `/api/logs`

---

## 8. Database Models (Conceptual)

### User

- name
- email
- password
- role

### Product

- name
- sku
- category
- quantity
- price
- supplier
- status
- isActive

### ActivityLog

- action
- productId
- userId
- createdAt

---

## 9. Frontend Pages & Components

### Pages

- Login
- Register
- Dashboard
- Inventory List
- Product Form (Add/Edit)
- Activity Logs

### Shared Components

- Navbar
- Sidebar
- ProtectedRoute
- DataTable
- Charts

---

## 10. Error Handling & Validation

- Backend input validation
- Centralized error middleware
- User-friendly frontend error messages
- Graceful loading & empty states

---

## 11. Security Considerations

- Password hashing
- JWT expiration
- Protected API routes
- Role-based access checks
- No sensitive data in frontend

---

## 12. Performance Considerations

- Pagination for product lists
- Indexed fields (SKU, category)
- Optimized aggregation queries
- Debounced frontend search

---

## 13. Future Enhancements (Optional)

- CSV import/export
- Dark mode
- Pagination & infinite scroll
- Notifications for low stock
- Unit tests (Jest)

---

## 14. Success Criteria

- Application runs end-to-end without errors
- Clear demonstration of MERN concepts
- Clean, readable, modular codebase
- Deployable and demo-ready

---

## 15. Summary

This Inventory Management System is a **portfolio-first, engineering-focused MERN project** designed to demonstrate practical full-stack skills without unnecessary complexity. It mirrors real-world internal tools and provides strong talking points for interviews and technical discussions.
