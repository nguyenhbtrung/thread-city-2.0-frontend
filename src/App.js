import './App.css';
import SignIn from './views/sign-in/SignIn';
import SignUp from './views/sign-up/SignUp';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar.js';
import Home from './views/home.js';
import Search from './views/search.js';
import Favorite from './views/favorite.js';
import Profiles from './views/profiles.js';
import Pin from './views/pin.js';
import Menu from './views/menu.js';
import PostForm from './views/PostForm.js';
import store from './Redux/store.js';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <div>
            <ConditionalNavBar
              Content={
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/post" element={<PostForm />} />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/profile/username/:userName" element={<Profiles />} />
                  <Route path="/pin" element={<Pin />} />
                  <Route path="/menu" element={<Menu />} />
                </Routes>
              }
            />
          </div>
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/post" element={<PostForm />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/profile/by-username/:userName" element={<Profiles />} />
            <Route path="/pin" element={<Pin />} />
            <Route path="/menu" element={<Menu />} />
          </Routes> */}
          {/* </Box> */}
        </Router>
        <ToastContainer autoClose={2000} />
      </Provider>
    </div>
  );
}

const ConditionalNavBar = ({ Content }) => {
  const location = useLocation();

  // Ẩn thanh NavBar ở trang đăng kí/ đăng nhập
  const hideNavBarPaths = ['/sign-in', '/sign-up'];

  return !hideNavBarPaths.includes(location.pathname) ? <NavBar Content={Content} /> : Content;
};

export default App;
