 # 📋 NoteIt — Notes App

A lightweight and responsive notes app where you can create, edit, delete, and search your notes. Built while learning React state management with Redux Toolkit.

---

## 🚀 Live Demo
> Coming soon / [Add your Vercel or Netlify link here]

---

## 🛠️ Tech Stack

- **React** — UI and component structure
- **Redux Toolkit** — global state management
- **React Router DOM** — client-side routing
- **Tailwind CSS** — styling and responsive design
- **LocalStorage** — data persistence without a backend
- **React Hot Toast** — user feedback notifications
- **Lucide React** — clean icon set

---

## ✨ Features

- 📝 Create notes with a title and content
- ✏️ Edit any existing note
- 🗑️ Delete notes with a single click
- 🔍 Search notes by title in real time
- 👁️ View a note in read-only mode
- 📋 Copy note content to clipboard
- 💾 Notes persist on page refresh using localStorage
- 🚫 Prevents saving empty notes

---

## 📁 Folder Structure 
src/
├── components/
│   ├── Navbar.jsx
│   ├── Home.jsx
│   ├── Paste.jsx
│   └── ViewPaste.jsx
├── redux/
│   ├── store.js
│   └── notesSlice.js
├── data/
│   └── NavbarData.js
├── utils/
│   └── formatDate.js
├── App.jsx
├── main.jsx
└── index.css

## 🧠 What I Learned

- Managing global state with Redux Toolkit slices and reducers
- Syncing Redux state with localStorage for persistence
- Using `useSearchParams` to handle edit mode via URL
- Component-level filtering without any backend
- Building a clean UI with Tailwind utility classes

---

## 📌 Known Limitations

- No backend — data is stored only in the browser's localStorage
- Notes are device-specific and not shareable across devices

## 🙋‍♂️ Author
Prathamesh Raut
- GitHub:Rprathamesh04
