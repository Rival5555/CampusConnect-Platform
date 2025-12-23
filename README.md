# UniEvent - Campus Connect Platform

A modern campus event discovery platform built with React, Tailwind CSS, and Firebase.

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Configure Firebase**
    - Create a project on [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password).
    - Enable **Firestore Database**.
    - Copy your firebase config keys.
    - Create a `.env` file in the root directory (copy `.env.example`).
    - Fill in your keys (variables must start with `VITE_`).

3.  **Run Development Server**
    ```bash
    npm run dev
    ```

## 🛠 Features

- **Student Dashboard**: Browse events, filter by category, search.
- **Admin Portal**: Secure login, create/edit/delete events.
- **Modern UI**: Glassmorphism, card layout, responsive design.

## 📁 Project Structure

- `src/components`: Reusable UI components (Navbar, EventCard, etc.)
- `src/pages`: Main application pages (Home, Login, Admin)
- `src/lib`: Utilities and Firebase helper functions

## 🎨 Design System

Events use a card-based layout with a focus on visual imagery (poster-first design). The theme is set in `tailwind.config.js`.
