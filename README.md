# 💊 Medicine E-Commerce Web Application

A full-stack Medicine E-Commerce platform built as part of a Frontend Developer Assignment. The project includes a user-facing pharmacy storefront and a separate Admin Panel for product management, fully integrated with a live backend API.

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React.js |
| Language | JavaScript |
| UI Library | Ant Design (antd) |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit |
| Routing | React Router DOM |
| Auth Storage | js-cookie |

---

## 📁 Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/       # Reusable UI components
├── pages/
│   ├── user/         # User-facing storefront pages
│   └── admin/        # Admin panel pages
├── layout/           # layout pages for user and admin
├── store/            # Redux store configuration
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v16 or above)
- pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SabeerRahman/Medicine-E-Commerce-Web-Application-.git

# 2. Navigate into the project directory
cd Medicine-E-Commerce-Web-Application

# 3. Install dependencies
pnpm install
```

### Running the Project

```bash
pnpm run dev
```

The app will start at `http://localhost:5173` (or the port shown in your terminal).

---

## 🌐 API Base URL

```
https://pharmacy-backend-api.vercel.app/
```

All product, category, and admin operations use this live backend.

---

## 🛍️ User Website Features

- View all products (fetched dynamically from API)
- View individual product details
- Filter products by category
  
---

## 🔐 Admin Panel Features

Access the admin panel at `/admin/dashboard`.

**Admin Credentials (for testing):**
- Email: `admin@example.com`
- Password: `adminPassword123`

### Capabilities

- **Login** — JWT token stored securely via `js-cookie`; admin routes are protected
- **Dashboard** — Displays total product count and product count broken down by category
- **Product Management:**
  - View all products
  - Create a new product (with image upload via `multipart/form-data`)
  - Update an existing product
  - Delete a product
  - Sort products by: Oldest / Newest / Price Ascending / Price Descending

All admin changes reflect immediately on the user-facing storefront.

---

## 🔗 API Endpoints Used

### Auth
- `POST /api/admin/auth/login`
- `POST /api/admin/auth/logout`
- `GET /api/admin/auth/me`

### Products (Public)
- `GET /api/products`
- `GET /api/products/:id`

### Products (Admin — requires Bearer token)
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

### Dashboard (Admin)
- `GET /api/admin/dashboard/stats`
- `GET /api/admin/dashboard/products/count`
- `GET /api/admin/dashboard/products/count-by-category`

---

## 📝 Assumptions & Notes

- If any API endpoint returned unexpected data during development, the response shape was assumed based on context and handled gracefully with fallback UI states.
- Mobile responsiveness is not guaranteed — the UI is optimized for desktop viewports as per the assignment requirements.
- No product data is hardcoded; all content is fetched dynamically from the live API.
- Token-based authentication is managed with `js-cookie` for secure persistence across sessions.

---

## 🙋 Author

Built for the **Decode Age Frontend Developer Assignment**.
