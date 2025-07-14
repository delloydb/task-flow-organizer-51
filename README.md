# Task Flow Organizer

A fully functional, multi-user **Task Management App** built with the **MERN stack** (MongoDB, Express.js, React with Next.js, Node.js). This application helps users manage personal and professional tasks efficiently with features like deadlines, priority levels, tags, recurring tasks, drag-and-drop organization, calendar view, and more.

## 🚀 Live Demo

Access the live deployed app here:  
[https://task-flow-organizer-51.lovable.app/](https://task-flow-organizer-51.lovable.app/)

---

## ✅ Features

- User registration and login (JWT Authentication)
- Secure password storage using bcrypt
- Create, edit, delete, and organize tasks
- Prioritize tasks (High, Medium, Low)
- Set deadlines and automatic reminders
- Recurring tasks (Daily, Weekly, Monthly)
- Task categorization using tags
- Filter and sort tasks by status, priority, or tags
- Drag-and-drop task reordering
- Calendar view for visual task tracking
- Mobile-responsive design using Tailwind CSS

---

## 🔧 Functionalities

### User Authentication
- Secure sign-up and login with JWT
- Passwords hashed using bcrypt
- Auth-protected routes
- Each user sees only their own tasks

### Task Management
- CRUD operations on tasks
- Task fields include:
  - Title, description
  - Deadline
  - Priority level
  - Status (To-do, In Progress, Done)
  - Tags
  - Recurrence (Daily, Weekly, Monthly)
  - Reminders
- Drag-and-drop task movement
- Sort and filter options
- Calendar integration

### User Interface
- Built with Next.js and Tailwind CSS
- Clean and intuitive layout
- Responsive for all devices
- Modal-based and page-based task interactions

---

## 📁 File Structure

task-manager-app/
│
├── backend/ # Express.js + MongoDB server
│ ├── controllers/ # Route logic for users and tasks
│ ├── middleware/ # Auth and error-handling middleware
│ ├── models/ # Mongoose schemas (User, Task)
│ ├── routes/ # API endpoints for tasks and users
│ ├── utils/ # Helper functions (e.g., token handling, cron jobs)
│ ├── config/ # MongoDB connection and environment configs
│ ├── server.js # Main backend entry point
│ └── .env.example # Example of environment variables
│
├── frontend/ # Next.js application
│ ├── components/ # Reusable UI components
│ ├── context/ # Global state (e.g., auth, tasks)
│ ├── pages/ # Routes
│ │ ├── index.js # Task dashboard
│ │ ├── calendar.js # Calendar view
│ │ ├── login.js # Login form
│ │ ├── register.js # Registration form
│ │ └── settings.js # User settings
│ ├── styles/ # Tailwind CSS files
│ ├── utils/ # API functions and helpers
│ └── tailwind.config.js # Tailwind configuration
│
├── README.md # Project documentation
└── package.json # Dependencies and scripts


---

## 🛠️ Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Calendar View:** FullCalendar or similar
- **Drag and Drop:** react-beautiful-dnd
- **Notifications & Reminders:** Node Cron, browser notifications
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙋 Author

**Lloyd Brown**  
Built as part of a MERN stack final year project  
For academic and professional demonstration

---

## 🧪 Future Improvements

- Google Calendar integration
- Offline support and PWA functionality
- Admin panel for team-based task management
- Enhanced analytics dashboard

