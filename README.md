# Task Manager App

A simple full-stack Task Manager application built with **Vite + React**, **Supabase**, and **TailwindCSS**.  
Users can register, log in, and manage their tasks with features like filtering, marking complete, and deleting.

---

## ✨ Features
- User Registration and Login (Email/Password Authentication via Supabase)
- View Tasks
- Add New Tasks
- Mark Tasks as Complete
- Delete Tasks
- Filter Tasks (All, Active, Completed)
- Task Priority Setting (Low, Medium, High)
- JWT-based Authentication
- RESTful API operations
- Custom React Hooks and State Management with React Context and Hooks

---

## 🛠️ Tech Stack and Architecture

| Tech | Why |
|:----|:----|
| **Vite + React** | Lightning-fast frontend development, modern React setup |
| **Supabase** | Backend-as-a-Service (Auth, Database, API) |
| **TailwindCSS** | Fast and responsive UI styling |
| **React Context API** | Lightweight state management across components |
| **React Hooks** | Functional component-based logic reuse and cleaner code |
| **Custom Hooks** | To encapsulate auth and data fetching logic (e.g., useAuth, useTasks) |

**Architecture Overview**:
- **Frontend** (Vite React App): Handles UI and API interactions.
- **Backend** (Supabase): Manages user authentication, database storage, and provides RESTful APIs.
- **Database** (PostgreSQL via Supabase): Stores users and tasks in relational tables.

---

## 👥 Database Schema

### Tables:

**Users** (Managed by Supabase Auth automatically)  

| Field | Type | Description |
|:------|:-----|:------------|
| id | UUID | Unique User ID (auto-generated) |
| email | Text | User Email |

**Tasks**  

| Field | Type | Description |
|:------|:-----|:------------|
| id | UUID | Unique Task ID (Primary Key) |
| title | Text | Title of the task |
| description | Text | Detailed description |
| status | Boolean | `true` for complete, `false` for incomplete |
| priority | Enum ('Low', 'Medium', 'High') | Priority level |
| created_at | Timestamp | Creation time (auto-generated) |
| user_id | UUID | Foreign key linked to Users table |

**Relationships**:
- Each **Task** is linked to a **User** via `user_id`.

---

## ⚙️ Setup Instructions

### Frontend (React App)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Nitin320/FSD.git
   cd FSD
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file at the root with the following:

   ```bash
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Run the App**
   ```bash
   npm run dev
   ```

### Backend (Supabase Setup)

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com/) and create a new project.

2. **Set Up Authentication**
   - Enable **Email/Password** authentication in Supabase Auth settings.

3. **Create the Tasks Table**
   Use the following SQL:

   ```sql
   create table tasks (
     id uuid primary key default uuid_generate_v4(),
     title text not null,
     description text,
     status boolean default false,
     priority text check (priority in ('Low', 'Medium', 'High')) default 'Low',
     created_at timestamp with time zone default timezone('utc'::text, now()),
     user_id uuid references auth.users(id) on delete cascade
   );
   ```

4. **Set Row Level Security (RLS)**
   - Enable RLS on the `tasks` table.
   - Add policies like:

   ```sql
   create policy "Only users can access their tasks"
   on tasks
   for all
   using (auth.uid() = user_id);
   ```

---

## 🚀 How to Run Locally

- Make sure you have **Node.js** and **npm** installed.
- Set up your Supabase project.
- Configure `.env` variables correctly.
- Run `npm run dev` to start the frontend.
- Access your app at `http://localhost:5173/` (default Vite port).

---

## 📁 Folder Structure

```bash
src/
  components/
    TaskList.jsx
    TaskItem.jsx
    AddTaskForm.jsx
    FilterTasks.jsx
  hooks/
    useAuth.js
    useTasks.js
  contexts/
    AuthContext.jsx
  services/
    supabaseClient.js
  pages/
    Login.jsx
    Register.jsx
    Dashboard.jsx
  App.jsx
  main.jsx
```

---

## 📌 Notes

- Proper error handling included for API requests.
- Protected routes to ensure only authenticated users access the dashboard.
- Used **PropTypes** for component prop validation.
- Custom Hooks for clean and reusable logic.

---

