# Minimal Library Management System

A minimalist yet powerful Library Management System built with **React**, **Redux Toolkit Query**, **TypeScript**, and a **Node.js/Express + MongoDB** backend. This project demonstrates clean architecture, responsive UI/UX, and robust state management, offering core library functionalities including book management and borrowing operations — all without the complexities of authentication or payment gateways.

---

## Features

### Public Access
- No login required — full access to all routes.

### Book Management
- List, add, edit, delete, and borrow books.
- View key attributes: Title, Author, Genre, ISBN, Copies, Availability.
- Auto-mark books unavailable when copies reach zero.

### Borrowing System
- Borrow book form with quantity and due date.
- Quantity limit = available copies.
- Redirect to a borrow summary upon success.

### Borrow Summary
- Aggregated view of borrowed books.
- Displays title, ISBN, and total borrowed quantity.

### UI Components
- Responsive design (Mobile, Tablet, Desktop).
- Navigation bar, Book Table, Borrow Form, Footer.


## Tech Stack

### Frontend
- **React 19 + TypeScript**
- **Redux Toolkit + RTK Query**
- **Tailwind CSS** (or Plain CSS)
- **React Router DOM**
- **Zod**, **React Hook Form** for schema-safe forms
- **Framer Motion**, **Lucide Icons**, **Radix UI**

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- Modular MVC structure
- Environment management with **dotenv**

---

## Project Structure

### Frontend

```

src/
├── components/
├── features/
│   ├── books/
│   └── borrows/
├── pages/
├── app/           # Redux Store & API setup
├── routes/
└── main.tsx

```

### Backend

```

src/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
└── server.ts

````

---

##  Installation

###  Prerequisites
- Node.js ≥ 18
- MongoDB ≥ 6.0
- Yarn or npm

###  Clone the Repo

```bash
git clone https://github.com/Ashiqur2812/library-management-frontend
cd library-management
````

###  Backend Setup

```bash
cd backend
npm install
cp .env.example .env # Add your MongoDB URI
npm run dev
```

###  Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  Usage

1. Navigate to `/books` to view all books.
2. Use "Add Book" to include a new entry.
3. Edit/Delete books inline from the book list.
4. Borrow any available book via the "Borrow" button.
5. View total borrow data on `/borrow-summary`.

---

##  API Overview

| Endpoint              | Method | Description                       |
| --------------------- | ------ | --------------------------------- |
| `/api/books`          | GET    | Fetch all books (with pagination) |
| `/api/books`          | POST   | Add a new book                    |
| `/api/books/:id`      | PUT    | Update a book                     |
| `/api/books/:id`      | DELETE | Delete a book                     |
| `/api/borrow/:bookId` | POST   | Borrow a book                     |
| `/api/borrow-summary` | GET    | Get aggregate borrowed data       |

---

##  UI/UX

*  Fully responsive layout (Tailwind CSS)
*  Smooth notifications via **react-hot-toast**
*  Clean modals with **Radix UI**
*  Simple animations using **Framer Motion**

---

## 🔧 Configuration

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/libraryDB
```

### Frontend `vite.config.ts` (if proxying)

```ts
server: {
  proxy: {
    '/api': 'http://localhost:5000'
  }
}
```

---

##  Examples

```ts
// RTK Query - Fetch All Books
const { data, isLoading } = useGetAllBooksQuery();

// Borrow Form Schema (Zod)
const schema = z.object({
  quantity: z.number().min(1),
  dueDate: z.string().nonempty()
});
```

---

##  Troubleshooting

| Issue                          | Solution                                    |
| ------------------------------ | ------------------------------------------- |
| MongoDB not connecting         | Check `.env` URI and MongoDB service        |
| API call failing (CORS)        | Ensure `cors()` is enabled in Express       |
| Form validation not working    | Ensure `zod` + `react-hook-form` setup      |
| UI not updating after mutation | Check RTK Query cache invalidation settings |

---


