import './App.css';
import SignIn from './views/sign-in/SignIn';
import SignUp from './views/sign-up/SignUp';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar.js';
import Home from './views/home.js';
import Search from './views/search.js';
import Post from './views/post.js';
import Favorite from './views/favorite.js';
import Profiles from './views/favorite.js';
import Pin from './views/pin.js';
import Menu from './views/menu.js';

function App() {

  return (
    <div className="App">
      <Router>
        <div>
          <ConditionalNavBar />
        </div>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/T1" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/post" element={<Post />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/pin" element={<Pin />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </div>
  );
}

const ConditionalNavBar = () => {
  const location = useLocation();

  // Ẩn thanh NavBar ở trang đăng kí/ đăng nhập
  const hideNavBarPaths = ['/sign-in', '/sign-up', '/'];

  return !hideNavBarPaths.includes(location.pathname) ? <NavBar /> : null;
};

export default App;
