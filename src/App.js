import logo from './logo.svg';
import './App.css';
import SignIn from './views/sign-in/SignIn.js';
import SignUp from './views/sign-up/SignUp.js';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <SignUp />
    </div>
  );
}

export default App;
