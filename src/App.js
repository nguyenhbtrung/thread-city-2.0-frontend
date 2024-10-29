import './App.css';
import SignIn from './views/sign-in/SignIn';
import SignUp from './views/sign-up/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
