# Thread City 2.0 Frontend - React + Material UI

## 📌 Overview
This project is **a demo of a social networking web application**. It consists of 2 parts: **Backend** and **Frontend**.  
This is the **Frontend** repository in the project built with **React (CRA)**.  
It features a modern UI powered by **Material UI**, global state management using **Redux Toolkit**, seamless API communication using **Axios**, and navigation handled by **React Router**.

Backend repository: [ThreadCity2.0BackEnd](https://github.com/yakciJ/ThreadCity2.0BackEnd)

---

## 🚀 Tech Stack
- [React](https://react.dev/)
- [Material UI](https://mui.com/)
- [Redux Toolkit](https://react-redux.js.org/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)
- [Yarn](https://yarnpkg.com/) (Package Manager)

---

## 📂 Project Structure
```
.
├── src/
│   ├── assets/       # Static assets
│   ├── Components/   # Reusable components
│   ├── Redux/        # Redux global state management
│   ├── Views/        # Page components
│   ├── Services/     # API services
│   ├── AppConst.js   # App global constants
│   ├── App.js        # App router config
│   └── index.js      # Entry point
├── .env             # Environment variables
├── package.json
```

---

## ⚙️ Environment Variables
Create a `.env` file in the project root and set the backend URL:

```env
REACT_APP_API_BASE_URL=https://localhost:7135
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/nguyenhbtrung/thread-city-2.0-frontend.git
cd thread-city-2.0-frontend
```

### 2. Install dependencies

```bash
yarn
```

### 3. Start development server

```bash
yarn start
```

The app will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Available Scripts

```bash
yarn start    # Start development server
yarn build    # Build for production
yarn test     # Run tests in interactive watch mode
yarn eject    # Expose CRA configuration for full customization
```

---

## 🔒 Authentication

- JWT-based authentication
- Token stored in localStorage
- Include the token in request headers for protected routes

---

## 📊 Features
- Newfeeds
- Search post by title or content
- Infinite scroll for list of posts
- Create new post
- User profile
- Like and comment on posts

---

## 📝 Notes

* Ensure `.env` is configured properly
* Backend server must be running for full functionality
* Node.js 18+ recommended
* Yarn 1.22+ recommended
* For production deployment:
  - Set proper environment variables
  - Enable HTTPS
  - Configure proper CORS settings
